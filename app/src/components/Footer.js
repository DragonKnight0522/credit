import { Avatar, Image, Typography } from 'antd';
import React from 'react';

export default function Footer() {
  return (
    <div style={{ backgroundColor: '#f0f4fe', minHeight: 200, padding: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography.Text
            style={{
              fontWeight: 700,
              color: '#555',
              cursor: 'pointer',
              fontSize: 16,
              padding: 10,
            }}
          >
            Vay tiền nhanh{' '}
          </Typography.Text>
          <Typography.Text
            style={{
              fontWeight: 700,
              color: '#555',
              cursor: 'pointer',
              fontSize: 16,
              padding: 10,
            }}
          >
            Vay tiêu dùng
          </Typography.Text>
          <Typography.Text
            style={{
              fontWeight: 700,
              color: '#555',
              cursor: 'pointer',
              fontSize: 16,
              padding: 10,
            }}
          >
            Vay tiền online{' '}
          </Typography.Text>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#fff',
          borderRadius: 10,
        }}
      >
        <Image src="https://res.cloudinary.com/dxmamwpfy/image/upload/v1692293407/appvay/tag8ghaeqodgedbcgaha.png" preview={false} width={200} />
      </div>
      <Typography.Text
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#555',
          textAlign: 'center',
        }}
      >
        <Typography.Text style={{ fontSize: 15, color: '#555' }}>
          &reg;
        </Typography.Text>
        Bản quyền thuộc về công ty cổ phần quản lý tài sản và đầu tư tài chính VIETCREDIT
      </Typography.Text>
    </div>
  );
}
