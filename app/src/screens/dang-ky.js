import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Form, Input, Typography, message, Button } from 'antd';
import InputMask from 'react-input-mask';
import Upload from '../components/Upload';
import { useHistory } from 'react-router-dom';
import api from '../api/index';
import isCorrectNumberPhone from '../utils/isCorrectNumberPhone';
import { useDispatch } from 'react-redux';
export default function DangKy() {
  const dispatch = useDispatch();
  const router = useHistory();
  const [idFront, setIdFront] = useState('');
  const [idBack, setIdBack] = useState('');
  const onFinish = async (e) => {
    try {
      await api.post('/users/verify', {
        ...e,
        id_front: idFront,
        id_back: idBack,
      });

      router.push('/xac-thuc-bank');
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
        padding: 20,
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
          Đăng ký thông tin
        </Typography.Title>
        <div>
          <Form wrapperCol={{}} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Họ tên"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên của bạn',
                },
              ]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                  message: 'Nhập ngày sinh của bạn',
                },
              ]}
              name="dob"
            >
              <InputMask
                mask="99/99/9999"
                maskplaceholder="dd/mm/yyyy"
                placeholder="Ngày / Tháng / Năm"
                style={{
                  borderRadius: 5,
                  padding: '5px 7px',
                  fontSize: 14,
                  width: '100%',
                  border: '1px solid #eaeaea',
                }}
                className="mask-focus"
              >
                {(inputProps) => <Input {...inputProps} />}
              </InputMask>
            </Form.Item>
            <Form.Item
              name="id_number"
              label="Số CMND/CCCD"
              rules={[
                {
                  required: true,
                  message: 'Nhập CMND/CCCD của bạn',
                },
              ]}
            >
              <Input placeholder="CMND/CCCD" />
            </Form.Item>
            <Form.Item label="Hình ảnh CMND/CCCD">
              <Upload type={'front'} onDispatch={(e) => setIdFront(e)} />
              <Upload type={'back'} onDispatch={(e) => setIdBack(e)} />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                  message: 'Nhập Địa chỉ của bạn',
                },
              ]}
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item
              name="job"
              label="Nghề nghiệp"
              rules={[
                {
                  required: true,
                  message: 'Điền nghề nghiệp của bạn',
                },
              ]}
            >
              <Input placeholder="Điền nghề nghiệp" />
            </Form.Item>
            <Form.Item
              name="income"
              label="Thu nhập / tháng"
              rules={[
                {
                  required: true,
                  message: 'Nhập Thu nhập của bạn',
                },
              ]}
            >
              <Input placeholder="Thu nhập" />
            </Form.Item>
            <Form.Item
              name="purpose"
              label="Mục đích vay tiền"
              rules={[
                {
                  required: true,
                  message: 'Mục đích vay tiền',
                },
              ]}
            >
              <Input placeholder="Mục đích vay tiền" />
            </Form.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button type="primary" shape="round" htmlType="submit">
                Tiếp tục
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
