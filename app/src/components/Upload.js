import React, { useState, useRef } from 'react';
import { Image, Typography, Spin, message } from 'antd';
import axios from 'axios';
import { CameraOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Compress from 'react-image-file-resizer';
import converter from '../utils/converteImage';
import { BASE_URL } from '../utils/constant';

export default function Upload({ type, onDispatch }) {
  const [chooseImage, setChooseImage] = useState('');
  const [loading, setLoading] = useState(false);

  function onChange(event) {
    if (event.target && event.target.files[0]) {
      Compress.imageFileResizer(
        event.target.files[0],
        480,
        480,
        'PNG', // compress format WEBP, JPEG, PNG
        100,
        0, // rotation
        async (uri) => {
          try {
            let formData = new FormData();
            const dataURI = converter(uri);
            formData.append('file', dataURI);
            setLoading(true);
            const { data } = await axios.post(
              BASE_URL + '/upload',
              formData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'access_token'
                  )}`,
                },
              }
            );

            // const transformater = 'w_300,h_400,c_fit';
            // const splited = data.secure_url.split('/');
            // let str = [
            //   ...splited.slice(0, 6),
            //   transformater,
            //   ...splited.slice(6),
            // ];

            const endpoint = data.secure_url
            localStorage.setItem(type, endpoint);
            setChooseImage(endpoint);
            onDispatch(endpoint);
          } catch (err) {
            message.error('Đã có lỗi trong việc upload ảnh. Vui lòng thử lại');
          } finally {
            setLoading(false);
          }
        },
        'base64' // blob or base64 default base64
      );
    }
  }

  return (
    <motion.div
      style={{
        margin: '10px 0px',
        height: 150,
        background: '#fff',
        width: '100%',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
        backgroundImage: `url(${chooseImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        border: '1px solid #eee',
        maxWidth: 480,
      }}
      whileTap={{ scale: 0.98, opacity: 0.3 }}
      onClick={() => document.getElementById(`camera${type}`).click()}
    >
      {loading ? (
        <Spin spinning />
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChange(e)}
            id={`camera${type}`}
            hidden
          />

          {type == 'front' && (
            <Typography.Text
              style={{
                color: chooseImage ? '#fff' : '#333',
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Mặt trước CMND / CCCD
            </Typography.Text>
          )}
          {type == 'back' && (
            <Typography.Text
              style={{
                color: chooseImage ? '#fff' : '#333',
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Mặt sau CMND / CCCD
            </Typography.Text>
          )}
          <CameraOutlined
            style={{ fontSize: 30, color: chooseImage ? '#fff' : '#333' }}
          />
        </>
      )}
    </motion.div>
  );
}
