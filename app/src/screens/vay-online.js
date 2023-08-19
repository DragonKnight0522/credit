import { Image, Typography } from 'antd';
import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
export default function VayOnline() {
  const router = useHistory();

  return (
    <>
      <motion.div
        style={{
          minHeight: '90vh',
          backgroundColor: '#f0f4fe',
          padding: '30px 20px',
        }}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Typography.Title
          level={5}
          style={{ fontWeight: 700, textAlign: 'center', color: '#493ffc' }}
          className="slogan-small"
        >
          Vay tiền online là gì ?{' '}
        </Typography.Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '0px 30px',
          }}
        >
          <Image src="https://res.cloudinary.com/dxmamwpfy/image/upload/v1692295904/appvay/ckkzjndhwuw9ptnmqvrg.png" preview={false} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
            className="row-container"
          >
            <Card
              title="Là một hình thức vay tín chấp "
              desc={
                'Người vay không cần có tài sản đảm bảo và bên cho vay dựa vào uy tín của người vay để cho vay'
              }
            />
            <Card
              title="Có quy trình hoàn toàn online"
              desc={
                'Các thủ tục vay diễn ra trực tuyến, không cần gặp mặt bên cho vay.'
              }
            />
            <Card
              title="Có thủ tục và điều kiện vay đơn giản
            "
              desc={
                'Đa số các bên cho vay chỉ yêu cầu người vay có CMND/CCCD còn hiệu lực.              '
              }
            />
            <Card
              title="Hạn mức vay lên đến 200 triệu VNĐ"
              desc={
                'Với Tín Việt, chúng tôi luôn đặt sự thoải mái tiện lợi của khách hàng lên hàng đầu. Chúng tôi cung cấp khoảng vay đa dạng cho nhiều nhu cầu vay khác nhau.'
              }
            />
          </div>
        </div>
      </motion.div>
      <Condition />
      <div
        style={{
          padding: '50px 0px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <motion.div
          style={{ maxWidth: 350 }}
          className="btn"
          whileTap={{
            opacity: 0.7,
            scale: 0.9,
          }}
          onClick={() => router.push('/home')}
        >
          <Typography.Text
            className="btn-text"
            style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}
          >
            Đăng ký vay
          </Typography.Text>
        </motion.div>
      </div>
    </>
  );
}
const Card = ({ title, desc }) => {
  return (
    <div
      style={{
        minHeight: 200,
        maxWidth: 300,
        background: '#fff',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        margin: '10px 0px',
        cursor: 'pointer',
      }}
    >
      <Typography.Title
        level={4}
        className="meta-text-small"
        style={{ textAlign: 'center' }}
      >
        {title}
      </Typography.Title>
      <Typography.Paragraph style={{ textAlign: 'center' }}>
        {desc}
      </Typography.Paragraph>
    </div>
  );
};

const Condition = () => {
  return (
    <div
      style={{
        background: '#493ffc',
        padding: 10,
        paddingBottom: 30,
      }}
    >
      <Typography.Title
        level={5}
        className="slogan-small"
        style={{ color: '#fff', textAlign: 'center' }}
      >
        Điều kiện để vay online
      </Typography.Title>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
        className="row-container"
      >
        <div
          style={{
            minHeight: 200,
            maxWidth: 300,
            borderRadius: 10,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px 0px',
          }}
        >
          <Image
            src="https://assets-global.website-files.com/6107d6546b656bffc909cd26/618301f46e7a72c2873e6a22_safe.svg"
            preview={false}
            width={100}
          />
          <Typography.Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontWeight: 700,
              padding: '10px 0px',
            }}
            className="text-meta-small"
          >
            CMND / CCCD
          </Typography.Text>
          <Typography.Paragraph style={{ color: '#fff', textAlign: 'center' }}>
            Bạn chỉ cần có CMND/CCCD còn hiệu lực
          </Typography.Paragraph>
        </div>
        <div
          style={{
            minHeight: 200,
            maxWidth: 300,
            borderRadius: 10,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px 0px',
          }}
        >
          <Image
            src="https://assets-global.website-files.com/6107d6546b656bffc909cd26/6183041591d9dc23da224a30_living-standards.svg"
            preview={false}
            width={100}
          />
          <Typography.Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontWeight: 700,
              padding: '10px 0px',
            }}
            className="text-meta-small"
          >
            Tài khoản ngân hàng
          </Typography.Text>
          <Typography.Paragraph style={{ color: '#fff', textAlign: 'center' }}>
            Bạn cần phải có tài khoản ngân hàng để nhận khoản vay
          </Typography.Paragraph>
        </div>
        <div
          style={{
            minHeight: 200,
            maxWidth: 300,
            borderRadius: 10,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px 0px',
          }}
        >
          <Image
            src="https://assets-global.website-files.com/6107d6546b656bffc909cd26/618301f18a190d375a3bfe8d_convenient.svg"
            preview={false}
            width={100}
          />
          <Typography.Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontWeight: 700,
              padding: '10px 0px',
            }}
            className="text-meta-small"
          >
            Số điện thoại
          </Typography.Text>
          <Typography.Paragraph style={{ color: '#fff', textAlign: 'center' }}>
            Bạn cần phải có một số điện thoại chính chủ để đăng ký vay
          </Typography.Paragraph>
        </div>
        <div
          style={{
            minHeight: 200,
            maxWidth: 300,
            borderRadius: 10,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px 0px',
          }}
        >
          <Image
            src="https://assets-global.website-files.com/6107d6546b656bffc909cd26/618301f2e49e3a53bcaab014_many-incentives.svg"
            preview={false}
            width={100}
          />
          <Typography.Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontWeight: 700,
              padding: '10px 0px',
            }}
            className="text-meta-small"
          >
            Độ tuổi
          </Typography.Text>
          <Typography.Paragraph style={{ color: '#fff', textAlign: 'center' }}>
            Từ 18 - 60 tuổi
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};
