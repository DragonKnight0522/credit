import React, { useEffect } from 'react'
import { Typography, Form, Input, Button, message } from 'antd'
import api from '../../api'

export default () => {
  const [form] = Form.useForm()

  const getData = async () => {
    try {
      const { data } = await api.get('/content')
      form.setFieldValue('cskh', data.data)
    } catch (err) {}
  }

  const onFinish = async values => {
    try {
      await api.put('/content', { content: values.cskh })
      message.success('Thay đổi thành công')
    } catch (err) {}
  }

  useEffect(() => {
    getData()
  })

  return (
    <div>
      <Typography.Title level={5}> Chỉnh sửa đường dẫn CSKH </Typography.Title>
      <br />
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 32 }}
        initialValues={{ cskh: '' }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <div>
          <Form.Item
            style={{ width: 350 }}
            label="CSKH"
            name="cskh"
            rules={[{ required: true, message: 'Không thể trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item style={{ marginTop: 30 }}>
            <Button type="primary" htmlType="submit">
              Thay đổi
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}
