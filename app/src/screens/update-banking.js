import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Form, Select, Input, Typography, Image, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import _bank from './bank.json';
import api from '../api';

export default function DangKy() {
  const [formData, setFormData] = useState({
    bankName: '',
    logo: '',
    number: '',
    name: '',
    date: '',
  });

  const router = useHistory();

  const onFinish = async (e) => {
    const contract = JSON.parse(localStorage.getItem('contract'));
    await api.post('/users/verify', {
      bank: { ...e },
    });
    await api.post('/contracts', {
      times: contract.times || 6,
      amount: contract.amount || 30000000,
    });

    // Lưu trạng thái formData vào local storage
    localStorage.setItem('formData', JSON.stringify(formData));

    router.push('profile');
  };

  useEffect(() => {
    // Khôi phục trạng thái formData khi quay lại trang
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

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
          Tài khoản ngân hàng
        </Typography.Title>
        <div>
          <Form wrapperCol={{}} layout="vertical" onFinish={onFinish}>
            <Form.Item
              key="bank_name"
              label="Tên ngân hàng"
              rules={[
                {
                  required: true,
                  message: 'Tên ngân hàng',
                },
              ]}
            >
              <Select
                className="select-bank"
                placeholder="Tên ngân hàng"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankName: e.split('@')[0],
                    logo: e.split('@')[1],
                  })
                }
              >
                {_bank.banksnapas.map((item) => (
                  <Select.Option key={item.id} value={`${item.shortName}`}>
                    <div>
                      <Typography.Text strong>
                        {item.shortName}
                      </Typography.Text>{' '}
                      - <Typography.Text>{item.vn_name}</Typography.Text>
                    </div>
                    {item.logo && (
                      <Image src={item.logo} preview={false} width="20%" />
                    )}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              key="bank_number"
              label="Số tài khoản ngân hàng"
              rules={[
                {
                  required: true,
                  message: 'Cần nhập số tài khoản ngân hàng',
                },
              ]}
            >
              <Input placeholder="Số tài khoản ngân hàng" />
            </Form.Item>
            <Form.Item
              key="bank_owner"
              label="Tên chủ thẻ"
              rules={[
                {
                  required: true,
                  message: 'Tên chủ thẻ',
                },
              ]}
            >
              <Input placeholder="Tên chủ thẻ" />
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
