import React from 'react';
import { Card, Button } from 'antd';
import "../App.css";
const UserCard = ({ user, showEditModal,deleteUser }) => (
  <Card
  className='card-photo'
    key={user.id}
    cover={<img src={user.image || 'user.png'} style={{ width: '200px', height: '200px', objectFit: 'cover'  }} />}
    actions={[<Button onClick={() => showEditModal(user)}>編輯</Button>,
    <Button danger onClick={() => deleteUser(user.id)}>刪除</Button>
  ]}
  >
    <Card.Meta title={`姓名:${user.name}`} description={`職業: ${user.occupation}`} />
  </Card>
);

export default UserCard;
