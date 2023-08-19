import React, { useState, useEffect } from 'react';
import { Badge, Typography, Carousel, Image, Button } from 'antd';
import { AlertFilled, DashboardFilled, SlidersFilled } from '@ant-design/icons';
import tickAsset from '../../assets/tick.png';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { Notification } from '../../components';
import home from '../../assets/ban.jpg';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
const arrayText = [
  '097***4 đã rút 35.000.000 đ',
  '033***8 đã rút 30.000.000 đ',
  '087***3 đã rút 45.000.000 đ',
  '033***1 đã rút 100.000.000 đ',
  '035***5 đã được duyệt hồ sơ',
  '033***5 đã rút 80.000.000 đ',
];

export default function Home() {
  const history = useHistory();
  const { profile } = useSelector((state) => state._auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < arrayText.length - 1)
        setCurrentIndex((prev) => prev + 1);
      else setCurrentIndex((prev) => 0);
    }, 1800);
    return () => clearInterval(interval);
  });
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="container"
    >
      <div className="header-content">
        <div>
          <Typography.Text className="text-head">Xin chào, </Typography.Text>
          <br />
          <Typography.Text className="text-head">
            {profile?.kyc?.name || profile.phone}
          </Typography.Text>
        </div>
        <motion.div
          whileTap={{ scale: 0.9, opacity: 0.7 }}
          onClick={() => history.push('/notifications')}
        >
          <Notification />
        </motion.div>
      </div>

      <div className="noti-text-container">
        <Typography.Text className="noti-text">
          {arrayText[currentIndex]}
        </Typography.Text>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', minHeight: 150 }}
      >
        <Image
          preview={false}
          src={home}
          width={'90%'}
          style={{ borderRadius: 10 }}
        />
      </div>
      <Button
        className="choose-btn"
        onClick={() => {
          history.push('/vay');
        }}
      >
        <Typography.Text
          style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
        >
          Đăng ký khoản vay
        </Typography.Text>
      </Button>
      <div style={{ padding: 20 }}>
        <Tab
          title={'Thủ tục vay nhanh chóng, đơn giản'}
          icon={<AlertFilled style={{ fontSize: 20, color: '#ff7323' }} />}
        />
        <Tab
          title={'Hạn mức vay lên đến 500tr VNĐ'}
          icon={<DashboardFilled style={{ fontSize: 20, color: '#008f50' }} />}
        />
        <Tab
          title={'Nhận tiền chỉ sau 30 phút làm hồ sơ'}
          icon={<SlidersFilled style={{ fontSize: 20, color: '#006997' }} />}
        />
      </div>
      <Carousel autoplay autoplaySpeed={2800} className="carousel-container">
        <div>
          <div className="carousel slider2">
            <div className="sl-text-container"></div>
          </div>
        </div>
        <div>
          <div className="carousel slider3">
            <div className="sl-text-container"></div>
          </div>
        </div>
        <div>
          <div className="carousel slider4">
            <div className="sl-text-container"></div>
          </div>
        </div>
      </Carousel>
      <div
        style={{
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image src={tickAsset} preview={false} style={{ maxWidth: 100 }} />
        <Typography.Text
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#555',
            textAlign: 'center',
          }}
        >
          &reg; Bản quyền thuộc về
          <br /> Ngân hàng Bảo Việt Bank
        </Typography.Text>
      </div>
    </motion.div>
  );
}
const Tab = ({ title, onClick, icon }) => {
  return (
    <motion.div
      whileTap={{
        scale: 0.96,
        opacity: 0.3,
        border: '1px solid #006997',
      }}
      onClick={onClick}
      style={{
        margin: '10px 0px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '7px 15px',
        border: '1px solid #006997',
        borderRadius: 5,
      }}
    >
      <Typography.Text
        style={{ flex: 1, fontSize: 16, color: '#006997', fontWeight: 500 }}
      >
        {title}
      </Typography.Text>
      {icon}
    </motion.div>
  );
};
