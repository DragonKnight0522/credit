import { useState, useEffect, useRef } from 'react';
import * as Screens from './screens';
import * as Components from './components';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider, useSelector, useDispatch } from 'react-redux';
import _store from './redux/store';
import useScreen from './hooks/useScreen';
import { message, Avatar, Tooltip } from 'antd';
import * as actions from './redux/actions/auth';
import api from './api';
import Home from './screens';
import Tutor from './screens/vay-online';
import UpdateBanking from './screens/update-banking';
import Login from './screens/login';
import Signup from './screens/signup';
import Profile from './screens/profile';
import Withdrawl from './screens/withdrawl';
import { motion } from 'framer-motion';
import Sign from './screens/dang-ky';
import Welcome from './screens/welcome';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import isVietnamesePhoneNumber from './utils/isCorrectNumberPhone';
const history = createBrowserHistory();

function App() {
  const { width } = useScreen();
    const history = useHistory();

  return (
    <>
      <Provider store={_store}>
        <Router history={history}>
          <Routers />
        </Router>
      </Provider>
    </>
  );
}
async function toCSKH() {
  try {
    const { data } = await api.get('/users/sign-zalo');
    if (isVietnamesePhoneNumber(data.data))
      window.location.assign(`https://zalo.me/${data.data}`);
    else {
      window.location.assign(`fb://profile/${data.data}`);
    }
  } catch (err) {
    message.error('Xảy ra lỗi, vui lòng thử lại sau');
  }
}

const Routers = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const localtion = useLocation();
  const { status, profile, accessToken } = useSelector((state) => state._auth);
  const [token] = useState(localStorage.getItem('access_token'));
  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await api.get('/users/profile');
          dispatch(actions.initialLogin(data.data));
        } catch (err) {}
      })();
    } else {
      history.push('/login')
    }
  }, [status]);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      (async () => {
        try {
          const { data } = await api.get('/users/profile');
          dispatch(actions.initialLogin(data.data));
        } catch (err) {}
      })();
    }
  }, [localtion.pathname]);

  return (
    <Switch>
      <Route path="/">
        <Navbar />
        <Tooltip>
          <motion.div
            style={{
              position: 'fixed',
              zIndex: 100,
              bottom: 100,
              right: 10,
              cursor: 'pointer',
            }}
            whileTap={{ opacity: 0.3, scale: 0.9 }}
            onClick={toCSKH}
          >
            <Avatar src="zalo.jpg" size={80} />
          </motion.div>
        </Tooltip>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/dang-ky" component={Sign} exact />
          <Route path="/xac-thuc-bank" component={UpdateBanking} exact />
          <Route path="/vay-online" component={Tutor} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/rut-tien" component={Withdrawl} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
        </Switch>
        <Footer />
      </Route>
    </Switch>
  );
};
export default App;
