import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
let menuItems = [
  {
    title: 'Hướng dẫn ',
    url: 'vay-online',
    cName: 'nav-links',
    type: 'route',
  },
  {
    title: 'Về chúng tôi',
    url: '/home',
    cName: 'nav-links',
    type: 'href',
  },
];
const Navbar = () => {
  const router = useHistory();
  const [active, setActive] = useState(false);
  const { profile, status } = useSelector((state) => state._auth);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <motion.div
      initial={{ opacity: 0.3, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <nav className="navbar">
        <h1 className="navbar-logo" onClick={() => router.push('/home')}>
          <motion.div whileTap={{ opacity: 0.3, scale: 0.9 }}>
            <img
              src="https://res.cloudinary.com/dxmamwpfy/image/upload/v1692293408/appvay/o5ofijrwcdxhsso9cleg.jpg"
              style={{
                height: '55px',
                borderRadius: '5px'
              }}
            />
          </motion.div>
        </h1>
        <div className="menu-icon" onClick={handleClick}>
          <i className={active ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={active ? 'nav-menu active' : 'nav-menu'}>
          {menuItems.map((item, index) => {
            return (
              <li key={index}>
                <a
                  onClick={() => {
                    router.push(item.url);
                    setActive(false);
                  }}
                  className={item.cName}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
          <li>
            <a
              onClick={() => {
                router.push(status ? 'profile' : 'login');
                setActive(false);
              }}
              className={'nav-links'}
            >
              {status ? 'Tài khoản' : 'Đăng nhập'}
            </a>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default Navbar;
