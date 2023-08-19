import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';
import _ from 'lodash';
import './Wallet.scss';
import {
  LeftOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  WifiOutlined,
  PayCircleOutlined,
  RightOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Typography,
  Button,
  Table,
  Modal,
  Popconfirm,
  message,
  Image,
  Input,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _cardbg from '../assets/cardbg.jpg';
import api from '../api';
import * as actions from '../redux/actions/auth';
import walletImage from '../assets/wallet.jpg';
export default function Wallet() {
  const { profile } = useSelector((state) => state._auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentRequest, setCurrentRequest] = useState({});
  useEffect(() => {
    loadCurrentRequest()
  }, []);
  
  const loadCurrentRequest = async () => {
    try {
      const { data } = await api.get('/requests/lasted');
      setCurrentRequest(data?.data ? data.data : {})

      const { data: data2 } = await api.get('/users/profile');
      dispatch(actions.initialLogin(data2.data));
    } catch (error) {
      setCurrentRequest({})
      console.log(error);
    }
  }

  const [contract, setContract] = useState({});
  const [visible, setVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [otp, setOtp] = useState('');
  const [passOTP, setPassOTP] = useState(false);

  const btnWithdrawOnclick = async () => {
    setOtp('')
    setIsDone(false)
    loadCurrentRequest()
    if (profile?.kyc?.status) {
      const { data } = await api.get('/requests/lasted');
      setCurrentRequest(data?.data ? data.data : {})

      const contracts = await api.get('/contracts')
      if (contracts?.data?.data[0]?.response === 'pending') {
        message.info('Yêu cầu rút tiền đang được xem xét, vui lòng thử lại sau!')
      } else if (data?.data && data?.data?.status === 'pending') {
        message.info('Lệnh rút tiền của bạn đang được xét duyệt, không thể tạo thêm yêu cầu!')
      } else {
        setVisible(true)
      }
    } else {
      message.info('Bạn cần xác minh danh tính.')
    }
  }

  const onConfirmWithdraw = async (e) => {
    if (profile.balance === 0) {
      message.error('Số dư khả dụng không đủ');
      return;
    }

    const contracts = await api.get('/contracts');
    setContract(contracts.data.data[0]);
    if (otp != contracts.data.data[0].slug) {
      message.error('Sai OTP');
      return;
    }

    await api.post('/requests', {
      amount: e,
      contractId: contracts.data.data[0]._id,
      bank_reciever: {
        name: profile?.kyc?.bank.name,
        number: profile?.kyc?.bank.number,
        bankName: profile?.kyc?.bank.bankName,
      },
    });

    loadCurrentRequest()
    setIsDone(true);
    return;
  };
  const [isConfirm, setIsConfirm] = useState(false);
  return (
    <motion.div
      style={{ padding: '10px 15px' }}
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ padding: 10 }}>
        <Card
          data={profile}
          balance={profile?.balance}
          currentRequest={currentRequest}
          onWithdraw={(e) => onConfirmWithdraw(e)}
        />
        <motion.div
          whileTap={{ scale: 0.97, opacity: 0.3 }}
          style={{ maxWidth: 350 }}
        >
          <Item
            text="Rút tiền về tài khoản liên kết"
            icon={
              <PayCircleOutlined
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  color: '#1040e0',
                }}
              />
            }
            onClick={
              btnWithdrawOnclick
            }
          />
        </motion.div>
        {
          !_.isEmpty(currentRequest) &&
          <div className='request-detail'>
            <div className="title-detail">Chi Tiết Giải Ngân</div>
            <table>
              <tr>
                <td>Thời gian rút tiền</td>
                <td>{moment(currentRequest.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
              </tr>
              <tr>
                <td>Thực rút về tài khoản</td>
                <td>{currentRequest.amount ? currentRequest.amount.toLocaleString() + ' VND' : ''}</td>
              </tr>
              <tr>
                <td>Trạng thái rút tiền</td>
                <td>{renderStatus(currentRequest.status)}</td>
              </tr>
              <tr>
                <td>Nguyên nhân</td>
                <td>{currentRequest.error}</td>
              </tr>
            </table>
          </div>
        }
        <Image
          src={walletImage}
          style={{ padding: 5, borderRadius: 10 }}
          preview={false}
        />
      </div>
      <Modal
        visible={visible}
        title={null}
        footer={null}
        closable={true}
        onCancel={() => {
          setVisible(false);
          setIsConfirm(false);
          setPassOTP(false);
        }}
        destroyOnClose
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {isDone ? (
            <>
              <CheckOutlined style={{ color: '#40eb31', fontSize: 40 }} />
              <Typography.Text
                style={{
                  color: '#333',
                  fontSize: 19,
                  textAlign: 'center',
                  paddingVertical: 10,
                }}
              >
                Rút tiền thành công !
              </Typography.Text>
              <Typography.Text
                style={{ color: '#777', fontSize: 15, textAlign: 'center' }}
              >
                Lệnh rút tiền đã được thực hiện. Vui lòng chờ duyệt!
              </Typography.Text>
            </>
          ) : (
            <>
              {passOTP ? (
                <>
                  <CheckOutlined style={{ color: '#40eb31', fontSize: 40 }} />
                  <Typography.Text
                    style={{
                      color: '#333',
                      fontSize: 19,
                      textAlign: 'center',
                      paddingVertical: 10,
                    }}
                  >
                    Đang tạo lệnh rút tiền !
                  </Typography.Text>
                  <Typography.Text
                    style={{ color: '#777', fontSize: 15, textAlign: 'center' }}
                  >
                    Vui lòng chờ ít phút...
                  </Typography.Text>
                </>
              ) : (
                <>
                  <Input
                    style={{
                      margin: 5,
                      fontWeight: 400,
                      fontSize: 18,
                      maxWidth: 250,
                      borderRadius: 10,
                    }}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Nhập mã OTP tại đây"
                  />

                  <br />

                  <motion.div
                    whileTap={{ opacity: 0.4, scale: 0.97 }}
                    style={{
                      background: '#002dbf',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      padding: '5px 10px',
                    }}
                    onClick={() => {
                      onConfirmWithdraw(profile?.balance);
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontSize: 17,
                        color: '#fff',
                        fontWeight: 'bold',
                      }}
                    >
                      Xác nhận rút
                    </Typography.Text>
                  </motion.div>
                </>
              )}
            </>
          )}
        </div>
      </Modal>
    </motion.div>
  );
}

function Card({ data, balance, onWithdraw }) {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showMoney, setShowMoney] = useState(true);
  return (
    <motion.div
      style={{ padding: 5, maxWidth: 350 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Typography.Title level={5}>Thẻ ngân hàng của bạn</Typography.Title>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            borderRadius: 10,
            width: '100%',
            height: 180,
            padding: 5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundImage: `url(${_cardbg})`,
          }}
          className="atm-card"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 10px',
              width: '100%',
            }}
          >
            {data?.kyc?.bank?.bank_name ? (
              <Typography.Text
                style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}
              >
                {data?.kyc?.bank?.bank_name}
              </Typography.Text>
            ) : (
              <WifiOutlined
                style={{
                  fontSize: 26,
                  color: '#fff',
                  fontWeight: 'bold',
                  transform: 'rotate(90deg)',
                }}
              />
            )}
          </div>
          <div
            style={{
              padding: 10,
              justifyContent: 'flex-start',
              minWidth: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 5,
                padding: 5,
                justifyContent: 'flex-start',
                flexDirection: 'column',
                maxWidth: '70%',
              }}
            >
              {data?.kyc?.bank?.bank_number ? (
                <>
                  <Typography.Text
                    style={{ fontSize: 17, color: '#fff', fontWeight: 'bold' }}
                  >
                    {data?.kyc?.bank?.number
                      ? `*******${data.kyc.bank.bank_number.slice(-3)}`
                      : ''}
                  </Typography.Text>
                  <Typography.Text
                    style={{ fontSize: 17, color: '#fff', fontWeight: 'bold' }}
                  >
                    {data?.kyc?.bank?.bank_owner}
                  </Typography.Text>
                </>
              ) : (
                <Typography.Text
                  style={{ fontSize: 17, color: '#fff', fontWeight: 'bold' }}
                >
                  Chưa đăng ký
                </Typography.Text>
              )}
            </div>
          </div>
        </div>
      </div>
      <Typography.Link style={{ fontSize: 13, paddingLeft: 0 }}>
        Sự an toàn của quỹ tài khoản được ngân hàng đảm bảo
      </Typography.Link>
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          width: '100%',
          background: '#eee',
          borderRadius: 5,
        }}
      >
        <motion.div
          style={{}}
          whileTap={{ opacity: 0.3 }}
          onClick={() => setVisible(true)}
        >
          <Typography.Text
            style={{ fontSize: 13, color: '#666', fontWeight: '400' }}
          >
            Số dư khả dụng :
          </Typography.Text>
          <br />
          <Typography.Text
            style={{ fontSize: 17, color: '#3e3e3e', fontWeight: 700 }}
          >
            {showMoney ? `${data?.balance?.toLocaleString()}  VND` : '******'}{' '}
          </Typography.Text>
        </motion.div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          {showMoney ? (
            <EyeOutlined
              onClick={() => setShowMoney((prev) => !prev)}
              style={{
                fontSize: 26,
                color: '#3e3e3e',
                fontWeight: 'bold',
              }}
            />
          ) : (
            <EyeInvisibleOutlined
              onClick={() => setShowMoney((prev) => !prev)}
              style={{
                fontSize: 26,
                color: '#3e3e3e',
                fontWeight: 'bold',
              }}
            />
          )}
          <br />
        </div>
      </motion.div>
      <Modal
        visible={visible}
        title={'Rút tiền'}
        footer={null}
        closable={true}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Input
            style={{
              fontSize: 18,
              fontWeight: 700,
              width: '100%',
              padding: 10,
              borderRadius: 10,
              border: '1px #eee solid',
            }}
            min={0}
            max={balance}
            placeholder="Nhập số tiền rút"
            onValueChange={(e, name) => setAmount(parseInt(e.target.value))}
          />
          <motion.div
            whileTap={{ opacity: 0.4, scale: 0.97 }}
            style={{
              background: '#002dbf',
              width: '70%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              padding: 5,
              marginTop: 30,
            }}
            onClick={() => {
              if (amount > data?.balance) {
                message.info('Không thể cao hơn mức khả dụng');
                return;
              }

              setVisible(false);
              onWithdraw(amount);
            }}
          >
            <Typography.Text
              style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}
            >
              Tiếp tục
            </Typography.Text>
          </motion.div>
        </div>
      </Modal>
    </motion.div>
  );
}
const Item = ({ text = 'title', icon, onClick = () => {} }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        border: '1px solid #eee',
        margin: '10px 0px',
        background: '#fff',
      }}
      onClick={onClick}
    >
      {icon}
      <Typography.Text style={{ flex: 1, fontSize: 16, paddingLeft: 20 }}>
        {text}
      </Typography.Text>
      <RightOutlined />
    </div>
  );
};
async function toCSKH() {
  try {

    // const { data } = await api.get('/users/sign-zalo');
    // window.location.assign(`https://zalo.me/${data.data}`);
  } catch (err) {
    message.error('Xảy ra lỗi, vui lòng thử lại sau');
  }
}
const renderStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'Đang xét duyệt'
    case 'accepted':
      return 'Thành công'
    case 'rejected':
      return 'Thất bại'
  }
  return ''
}