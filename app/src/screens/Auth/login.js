import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Form, Input, Typography, message, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/auth';
import api from '../api';

export default function DangKy() {
  const dispatch = useDispatch();

  const router = useHistory();
  const onFinish = async (e) => {
    try {
      const { data } = await api.post('/auth/login', e);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('role', data.role);
      dispatch({ type: 'LOGIN_SUCCESS', payload: {} });
      console.log('aaaaaa')
      router.push('/profile');
    } catch (err) {
      message.error(err);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#efefef',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          minWidth: '90vw',
          background: '#fff',
          borderRadius: 10,
          minHeight: 120,
          padding: 10,
        }}
      >
        <Typography.Title level={4} style={{ textAlign: 'center' }}>
          Đăng nhập
        </Typography.Title>
        <div>
          <Form wrapperCol={{}} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="phone"
              label="Số điện thoại đăng nhập"
              rules={[
                {
                  required: true,
                  message: 'Số điện thoại đăng nhập',
                },
              ]}
            >
              <Input placeholder="Số điện thoại đăng nhập" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: 'Cần nhập mật khẩu',
                },
              ]}
            >
              <Input placeholder="Mật khẩu" type={'password'} />
            </Form.Item>

            <div onClick={() => router.push('/signup')} className='link-signup'>Đăng ký tài khoản</div>

            <div>
              <Button style={{width: '100%', marginBottom: '10px'}} type="primary" shape="round" htmlType="submit">
                Tiếp tục
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
