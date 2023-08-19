import {
  Avatar,
  Typography,
  Button,
  Divider,
  Modal,
  Input,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/auth';
import ContractForm from '../components/Contract';
import { useHistory } from 'react-router-dom';
import api from '../api';

export default function Profile() {
  const router = useHistory();
  const dispatch = useDispatch();
  const { status, profile } = useSelector((state) => state._auth);
  const [visible, setVisible] = useState(false);
  const [visibleBank, setVisibleBank] = useState(false);
  const [token] = useState(localStorage.getItem('access_token'));

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await api.get('/users/profile');
          dispatch(actions.initialLogin(data.data));
        } catch (err) {}
      })();
    }
  }, [status]);

  return (
    <>
      <div style={{ background: '#efefef', padding: 10 }}>
        <div
          style={{
            background: '#fff',
            minWidth: '90vw',
            borderRadius: 10,
            padding: 5,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar shape="square" size={100} src={profile?.avatar} />
            <div style={{ padding: 5 }}>
              <Typography.Title level={5}>
                {profile?.kyc?.name}
              </Typography.Title>
              <Typography.Link onClick={() => setVisibleBank(true)}>
                Ngân hàng
              </Typography.Link>
              <Typography.Title level={5}>{profile?.phone}</Typography.Title>
              <Typography.Link onClick={async () => {
                dispatch(actions.Logout())
                router.push('/login')
              }}>
                Đăng xuất
              </Typography.Link>
            </div>
          </div>
          <div
            style={{
              borderTop: '1px solid #999',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0px',
            }}
          >
            <Typography.Text>
              Số dư tài khoản : {profile?.balance?.toLocaleString()} VNĐ{' '}
            </Typography.Text>
            <Button type="primary" onClick={() => router.push('rut-tien')}>
              Rút tiền
            </Button>
          </div>
        </div>

        <div>
          <Typography.Title level={5}>Thông tin cá nhân</Typography.Title>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            padding: 10,
            background: '#fff',
            borderRadius: 5,
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Họ tên :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.name}
            </Typography.Text>
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Địa chỉ :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.address}
            </Typography.Text>
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Số CMND/CCCD :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.id_number}
            </Typography.Text>
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Ngày sinh :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.dob}
            </Typography.Text>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Nghề nghiệp :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.job}
            </Typography.Text>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Thu nhập :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.income}
            </Typography.Text>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Mục đích khoản vay :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.purpose}
            </Typography.Text>
          </div>
        </div>

        <Modal
          visible={visibleBank}
          title={null}
          footer={null}
          closable={true}
          onCancel={() => {
            setVisibleBank(false);
          }}
          destroyOnClose
        >
          <Divider orientation="left">Tài khoản ngân hàng</Divider>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%',
              padding: 10,
              background: '#fff',
              borderRadius: 5,
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '5px 0px',
              }}
            >
              <Typography.Text
                style={{
                  paddingRight: 10,

                  fontSize: 14,
                  fontWeight: 500,
                  flex: 2,
                }}
              >
                Tên ngân hàng :{' '}
              </Typography.Text>
              <Typography.Text
                style={{
                  flex: 2,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {profile?.kyc?.bank?.bank_name}
              </Typography.Text>
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '5px 0px',
              }}
            >
              <Typography.Text
                style={{
                  paddingRight: 10,

                  fontSize: 14,
                  fontWeight: 500,
                  flex: 2,
                }}
              >
                Số TK ngân hàng :{' '}
              </Typography.Text>
              <Typography.Text
                style={{
                  flex: 2,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {profile?.kyc?.bank?.bank_number}
              </Typography.Text>
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '5px 0px',
              }}
            >
              <Typography.Text
                style={{
                  paddingRight: 10,

                  fontSize: 14,
                  fontWeight: 500,
                  flex: 2,
                }}
              >
                Tên thụ hưởng :{' '}
              </Typography.Text>
              <Typography.Text
                style={{
                  flex: 2,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {profile?.kyc?.bank?.bank_owner}
              </Typography.Text>
            </div>
          </div>
        </Modal>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
          <ContractForm profile={profile} />
        </div>
      </div>
      <Modal
        visible={visible}
        title={null}
        footer={null}
        closable={true}
        onCancel={() => {
          setVisible(false);
        }}
        destroyOnClose
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography.Title level={5} style={{ textAlign: 'center' }}>
            Mã OTP đã gửi đến số điện thoại của bạn
          </Typography.Title>
          <Input
            style={{
              margin: 5,
              fontWeight: 400,
              fontSize: 18,
              maxWidth: 250,
              borderRadius: 10,
            }}
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
            onClick={() => setVisible(false)}
          >
            <Typography.Text
              style={{ fontSize: 17, color: '#fff', fontWeight: 'bold' }}
            >
              Xác nhận rút
            </Typography.Text>
          </motion.div>
        </div>
      </Modal>
    </>
  );
}
