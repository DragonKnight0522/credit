import { useState } from 'react';
import { Carousel, Image, message, Rate, Select, Typography } from 'antd';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from 'rc-slider';

const marks = {
  30000000: ' ',
  50000000: ' ',
  70000000: ' ',
  80000000: ' ',
  100000000: ' ',
  200000000: ' ',
  300000000: ' ',
  400000000: ' ',
  500000000: '  ',
};

export default function Home() {
  const [value, setValue] = useState(30000000);
  const [times, setTimes] = useState(12);
  const { status, profile } = useSelector((state) => state._auth);
  const router = useHistory();
  function setupContract() {
    if (!status) {
      router.push('/login');
      return;
    }
    if (profile && profile.kyc && profile.kyc.bank) {
      message.error('Bạn đã có khoản vay!');
      return;
    }
    if (profile && profile.kyc && !profile.kyc.bank) {
      router.push('/xac-thuc-bank');
      return;
    }
    if (value < 30000000) {
      message.error('Hãy nâng hạn mức vay');
      return;
    }
    let contract = {};
    contract['times'] = times;
    contract['amount'] = value;
    localStorage.setItem('contract', JSON.stringify(contract));
    router.push('/dang-ky');
  }
  return (
    <>
      <div
        style={{
          minHeight: '95vh',
          display: 'flex',
          justifyContent: 'space-between',
          aliginItems: 'center',
          flexWrap: 'wrap',
          padding: 20,
          background: '#f0f4fe',
          backgroundImage: `url('https://res.cloudinary.com/dxmamwpfy/image/upload/v1692293409/appvay/wl3j0cqa2osz52m7tusf.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            aliginItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography.Text
            style={{
              textAlign: 'center',
              fontWeight: 600,
              color: '#fff',
              background: 'rgba(0,0,0,0.7)',
              borderRadius: 5,
              padding: 10,
            }}
            className="text-meta"
          >
            Vay an toàn, nhanh chóng, dễ dàng.
            <br /> VIETCREDIT đem đến sự trải nghiệm tuyệt vời và phù hợp với
            bạn.{' '}
          </Typography.Text>
        </motion.div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              background: '#fff',
              borderRadius: 10,
              padding: 20,
              minHeight: 200,
              minWidth: 300,
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            }}
          >
            <Typography.Title
              level={5}
              style={{ textAlign: 'center', fontSize: 21 }}
            >
              Hạn mức vay từ 30 triệu đến 500 triệu VNĐ
            </Typography.Title>
            <Slider
              step={null}
              onChange={(e) => setValue(e)}
              marks={marks}
              min={30000000}
              max={500000000}
              value={value}
            />
            <Typography.Title level={4} style={{ textAlign: 'center' }}>
              {value.toLocaleString()} VNĐ
            </Typography.Title>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: 10,
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Select
                style={{ minWidth: 200, borderRadius: 15 }}
                value={times}
                onChange={(e) => setTimes(e)}
              >
                <Select.Option value={12}>Kỳ hạn 12 tháng</Select.Option>
                <Select.Option value={18}>Kỳ hạn 18 tháng</Select.Option>
                <Select.Option value={24}>Kỳ hạn 24 tháng</Select.Option>
                <Select.Option value={36}>Kỳ hạn 36 tháng</Select.Option>
                <Select.Option value={48}>Kỳ hạn 48 tháng</Select.Option>
                <Select.Option value={60}>Kỳ hạn 60 tháng</Select.Option>
                <Select.Option value={72}>Kỳ hạn 72 tháng</Select.Option>
              </Select>
              <Typography.Title level={5} style={{ textAlign: 'center' }}>
                {' '}
                Tiền đóng mỗi tháng khoảng{' '}
                {Math.ceil(
                  value / times + value * 0.007
                ).toLocaleString()}{' '}
                VNĐ
              </Typography.Title>
            </div>

            <motion.div
              style={{}}
              className="btn"
              whileTap={{
                opacity: 0.7,
                scale: 0.9,
              }}
              onClick={setupContract}
            >
              <Typography.Text
                className="btn-text"
                style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}
              >
                Đăng ký vay
              </Typography.Text>
            </motion.div>
          </motion.div>
          <Typography.Title
            level={5}
            style={{
              padding: 20,
              fontSize: 20,
              fontWeight: 700,
              color: '#000',
              marginTop: 50,
              background: 'rgba(237,202,81,1)',
              borderRadius: 10,
            }}
          >
            Hotline :**** *** ***{' '}
          </Typography.Title>
        </div>
      </div>

      <Options />
      <About />
      <div
        id="download"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: 20,
        }}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 2,
          }}
        >
          <Typography.Title
            level={3}
            className="slogan-small"
            style={{
              textAlign: 'center',
              fontWeight: 700,
              color: '#493ffc',
              borderRadius: 5,
              padding: 10,
            }}
          >
            Ứng dụng tài chính cá nhân <br />
            cho nhu cầu hàng ngày của bạn
          </Typography.Title>
          <Typography.Text
            style={{
              textAlign: 'center',
              fontWeight: 600,
              color: '#333',
              padding: 10,
            }}
            className="text-meta-small"
          >
            Đăng ký hồ sơ vay vốn ngay với chúng tôi , nhận tiền về tài khoản
            sau 30 phút
          </Typography.Text>
        </motion.div>
      </div>
    </>
  );
}
const Options = () => {
  return (
    <div
      style={{
        minHeight: '80vh',
        background: '#3034ea',
        padding: 10,
        paddingBottom: 30,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src="https://res.cloudinary.com/dxmamwpfy/image/upload/v1692293407/appvay/cr3evirr8tgxyvtyr6tl.png" preview={false} />
        <div style={{ padding: 20, maxWidth: 400 }}>
          <Typography.Title
            level={5}
            className="text-meta"
            style={{ color: '#fff', fontWeight: 700 }}
          >
            Nhanh chóng
          </Typography.Title>
          <Typography.Text style={{ color: '#fff', fontSize: 16 }}>
            Bạn không cần phải mất hàng giờ đồng hồ để tìm đề nghị tài chính tốt
            nhất. Với chúng tôi, bạn có thể nhận được đề nghị vay tốt nhất trong
            vòng chưa đầy 20 phút
          </Typography.Text>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row-reverse',
        }}
      >
        <Image src="https://res.cloudinary.com/dxmamwpfy/image/upload/v1692293407/appvay/xmkucnbchfyupdrnsvph.png" preview={false} />
        <div style={{ padding: 20, maxWidth: 400 }}>
          <Typography.Title
            level={5}
            className="text-meta"
            style={{ color: '#fff', fontWeight: 700 }}
          >
            Tiện lợi
          </Typography.Title>
          <Typography.Text style={{ color: '#fff', fontSize: 16 }}>
            Toàn bộ quy trình hoàn toàn online 100% và bạn có thể đăng ký vay
            24/7
          </Typography.Text>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src="https://res.cloudinary.com/dxmamwpfy/image/upload/v1692293407/appvay/hvw27yfxesybzprk5ul1.png" preview={false} />
        <div style={{ padding: 20, maxWidth: 400 }}>
          <Typography.Title
            level={5}
            className="text-meta"
            style={{ color: '#fff', fontWeight: 700 }}
          >
            An toàn
          </Typography.Title>
          <Typography.Text style={{ color: '#fff', fontSize: 16 }}>
            Chúng tôi chỉ hợp tác với các đối tác tài chính uy tín để bạn có thể
            chắc chắn rằng mình không bị lừa khi vay tiền
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div
      id="about"
      style={{
        minHeight: '80vh',
        padding: 10,
        paddingBottom: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <Typography.Title
          level={5}
          className="text-meta"
          style={{ textAlign: 'center' }}
        >
          Hơn 10 năm kinh nghiệm trong lĩnh vực tài chính
        </Typography.Title>

        <Carousel className="carousel" autoplay>
          <div>
            <div
              className="carousel-item"
              style={{
                background: 'red',
                borderRadius: 10,
                backgroundImage: `url('https://res.cloudinary.com/dxmamwpfy/image/upload/v1692293408/appvay/xlalps7vlpgjyzd7tca2.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
          <div>
            <div
              className="carousel-item"
              style={{
                background: 'red',
                borderRadius: 10,
                backgroundImage: `url('https://res.cloudinary.com/dxmamwpfy/image/upload/v1692293407/appvay/cb021ssomao3bz75v66i.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
          <div>
            <div
              className="carousel-item"
              style={{
                background: 'red',
                borderRadius: 10,
                backgroundImage: `url('https://res.cloudinary.com/dxmamwpfy/image/upload/v1692293409/appvay/pmwi1tpngjzqmb2qgxci.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        </Carousel>
      </div>
      <div>
        <Typography.Title
          level={5}
          className="text-meta"
          style={{ textAlign: 'center' }}
        >
          Khách hàng nói gì về chúng tôi
        </Typography.Title>
        <Carousel className="carousel" autoplay>
          <div>
            <div style={{ padding: 20 }}>
              <RateCard
                name={'Anh Trịnh Văn Minh - 42 tuổi'}
                desc="Nhờ có VIETCREDIT mà tôi có thể nhận nhiều khoản vay online khác nhau chỉ trong một lần đăng ký!"
              />
            </div>
          </div>
          <div>
            <div style={{ padding: 20 }}>
              <RateCard
                name="Chị Nguyễn Phương Trâm - 27 tuổi"
                desc={
                  'Chỉ với điện thoại kết nối internet là tôi có thể vay tiền online dễ dàng, thật đơn giản và dễ sử dụng'
                }
              />
            </div>
          </div>
          <div>
            <div style={{ padding: 20 }}>
              <RateCard
                name="Anh Đặng Xuân Khoa - 32 tuổi"
                desc={
                  'Hồ sơ duyệt thực sự nhanh, đội ngũ nhân viên chăm sóc tốt quá.'
                }
              />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

const RateCard = ({ name, desc }) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        minHeight: 200,
        padding: 20,
      }}
    >
      <Rate value={5} />
      <Typography.Title level={5}>{name}</Typography.Title>
      <Typography.Paragraph style={{ fontSize: 17 }}>
        {desc}
      </Typography.Paragraph>
    </div>
  );
};
