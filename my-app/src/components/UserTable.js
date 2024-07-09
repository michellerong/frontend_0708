import React from 'react';
import { Table, Button } from 'antd';
import "../App.css";
const UserTable = ({ filteredUsers, loading, currentPage, pageSize, setCurrentPage, setPageSize, showEditModal,deleteUser }) => {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: '性别', dataIndex: 'gender', key: 'gender', sorter: (a, b) => a.gender.localeCompare(b.gender) },
    { title: '生日', dataIndex: 'birthday', key: 'birthday', sorter: (a, b) => a.birthday.localeCompare(b.birthday) },
    { title: '職業', dataIndex: 'occupation', key: 'occupation', sorter: (a, b) => a.occupation.localeCompare(b.occupation) },
    { title: '電話', dataIndex: 'phone', key: 'phone', sorter: (a, b) => a.phone.localeCompare(b.phone) },
    
  ];

  return (
    <Table
      dataSource={filteredUsers}
      columns={columns}
      loading={loading}
      pagination={{ pageSize, current: currentPage, onChange: (page, pageSize) => { setCurrentPage(page); setPageSize(pageSize); } }}
    />
  );
};

export default UserTable;
