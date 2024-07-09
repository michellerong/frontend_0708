import React from 'react';
import { Modal, Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserModal = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  user,
  handleInputChange,
  handleSelectChange,
  handleUploadChange,
  fileList
}) => (
  <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    {user && (
      <Form initialValues={user}>
        <Form.Item label="姓名" name="name">
          <Input name="name" value={user.name} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="性別" name="gender">
          <Select name="gender" value={user.gender} onChange={(value) => handleSelectChange(value, 'gender')}>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </Form.Item>
        <Form.Item label="生日" name="birthday">
          <Input name="birthday" value={user.birthday} onChange={handleInputChange} placeholder="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="職業" name="occupation">
          <Select name="occupation" value={user.occupation} onChange={(value) => handleSelectChange(value, 'occupation')}>
            <Option value="學生">學生</Option>
            <Option value="工程師">工程師</Option>
            <Option value="教師">教師</Option>
            <Option value="無業">無業</Option>
          </Select>
        </Form.Item>
        <Form.Item label="電話" name="phone">
          <Input name="phone" value={user.phone} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="上傳圖像" name="image">
          <Upload name="image" listType="picture" fileList={fileList} maxCount={1} beforeUpload={() => false} onChange={handleUploadChange}>
            <Button icon={<UploadOutlined />}>上傳圖像</Button>
          </Upload>
        </Form.Item>
      </Form>
    )}
  </Modal>
);

export default UserModal;
