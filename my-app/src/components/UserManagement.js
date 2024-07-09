import React, { useState, useEffect } from 'react';
import { Tabs, Button, Input, message } from 'antd';
import axios from 'axios';
import UserCard from './UserCard';
import UserTable from './UserTable';
import UserModal from './UserModal';
import "../App.css";

const { TabPane } = Tabs;

const UserManagement = () => {
  const [users, setUsers] = useState([]); // 使用者列表
  const [isModalVisible, setIsModalVisible] = useState(false); // 編輯彈跳視窗狀態
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // 新增彈跳視窗狀態
  const [editingUser, setEditingUser] = useState(null); // 當前編輯中的使用者
  const [newUser, setNewUser] = useState({ name: '', gender: '', birthday: '', occupation: '', phone: '', image: '' }); // 欲新增的使用者
  const [editFileList, setEditFileList] = useState([]); // 編輯使用者表單(獲取陣列資料)
  const [newFileList, setNewFileList] = useState([]); // 新增使用者表單
  const [searchTerm, setSearchTerm] = useState(''); // 搜尋關鍵字
  const [loading, setLoading] = useState(true); // 是否正在加載
  const [filteredUsers, setFilteredUsers] = useState([]); // 篩選後的用戶列表
  const [tab, setTab] = useState('card'); // 狀態預設卡片頁籤
  const [pageSize, setPageSize] = useState(6); // 每頁顯示的使用者數量
  const [currentPage, setCurrentPage] = useState(1); // 當前頁碼

  useEffect(() => {
    fetchUsers(); // 當組件加載時，獲取使用者資料
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm); // 當搜尋關鍵字改變時，進行搜尋。
    }, 500);
    return () => clearTimeout(timeoutId); // 清除定時器
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users'); // 發送 GET 請求獲取資料，使用非同步方式獲取
      setUsers(response.data); // 設定使用者資料
      setFilteredUsers(response.data); // 設定篩選後的使用者資料
      setLoading(false); // 設置加載狀態為 false
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('獲取使用者失敗'); // 顯示錯誤消息
      setLoading(false);
    }
  };

  const showEditModal = (user) => {
    setEditingUser(user); // 設定當前編輯中的使用者
    setEditFileList(user.image ? [{ uid: '-1', url: user.image }] : []); // 設定編輯使用者的列表
    setIsModalVisible(true); // 顯示編輯彈跳視窗
  };

  const showAddModal = () => {
    setIsAddModalVisible(true); // 顯示新增彈跳視窗
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users', newUser); // 發送 POST 請求新增使用者
      setUsers(prevUsers => [...prevUsers, response.data]); // 更新使用者列表
      setFilteredUsers(prevUsers => [...prevUsers, response.data]); // 更新篩選後的使用者列表
      setIsAddModalVisible(false); // 隱藏新增彈跳視窗
      setNewUser({ name: '', gender: '', birthday: '', occupation: '', phone: '', image: '' }); // 重置新增使用者
      setNewFileList([]); // 清空新增使用者表單
      message.success('新增使用者成功'); // 顯示成功消息
    } catch (error) {
      console.error('Error adding user:', error);
      message.error('新增使用者失敗'); // 顯示錯誤消息
    }
  };

  const handleOk = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${editingUser.id}`, editingUser); // 發送 PUT 請求更新使用者數據
      setUsers(prevUsers => prevUsers.map(user => user.id === editingUser.id ? response.data : user)); // 更新使用者列表
      setFilteredUsers(prevUsers => prevUsers.map(user => user.id === editingUser.id ? response.data : user)); // 更新篩選後的使用者列表
      setIsModalVisible(false); // 隱藏編輯彈跳視窗
      setEditingUser(null); // 清空當前編輯中的使用者
      setEditFileList([]); // 清空編輯使用者表單
      message.success('更新使用者成功'); // 顯示成功消息
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('更新使用者失敗'); // 顯示錯誤消息
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // 隱藏編輯彈跳視窗
    setIsAddModalVisible(false); // 隱藏新增彈跳視窗
    setEditingUser(null); // 清空當前編輯中的使用者
    setNewUser({ name: '', gender: '', birthday: '', occupation: '', phone: '', image: '' }); // 重置新增使用者
    setEditFileList([]); // 清空編輯使用者表單
    setNewFileList([]); // 清空新增使用者表單
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target; // 獲取輸入框的 name 和 value
    if (isModalVisible) {
      setEditingUser((prev) => ({ ...prev, [name]: value })); // 更新編輯中的使用者
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value })); // 更新新增使用者
    }
  };

  const handleSelectChange = (value, field) => {
    if (isModalVisible) {
      setEditingUser((prev) => ({ ...prev, [field]: value })); // 更新編輯中的使用者
    } else {
      setNewUser((prev) => ({ ...prev, [field]: value })); // 更新新增使用者
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value); // 設置搜尋關鍵字
    const filtered = users.filter(user =>
      user.name.includes(value) ||
      user.gender.includes(value) ||
      user.birthday.includes(value) ||
      user.occupation.includes(value) ||
      user.phone.includes(value)
    ); // 根據搜尋關鍵字篩選用戶
    setFilteredUsers(filtered); // 更新篩選後的用戶列表
  };

  const handleEditUploadChange = ({ fileList }) => {
    setEditFileList(fileList); // 設置編輯使用者表單
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj; // 獲取文件
      const reader = new FileReader();
      reader.onload = e => {
        setEditingUser((prev) => ({ ...prev, image: e.target.result })); // 更新編輯中的使用者圖像
      };
      reader.readAsDataURL(file);
    } else {
      setEditingUser((prev) => ({ ...prev, image: '' })); // 清空編輯中的使用者圖像
    }
  };

  const handleNewUploadChange = ({ fileList }) => {
    setNewFileList(fileList); // 設置新增使用者表單
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj; // 獲取文件
      const reader = new FileReader();
      reader.onload = e => {
        setNewUser((prev) => ({ ...prev, image: e.target.result })); // 更新新增使用者圖像
      };
      reader.readAsDataURL(file);
    } else {
      setNewUser((prev) => ({ ...prev, image: '' })); // 清空新增使用者圖像
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`); // 發送 DELETE 請求刪除使用者
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id)); // 更新使用者列表
      setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== id)); // 更新篩選後的使用者列表
      message.success('使用者已刪除'); // 顯示成功消息
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('刪除使用者失敗'); // 顯示錯誤消息
    }
  };

  const items = [
    {
      key: 'card',
      label: '使用者管理',
      children: (
        <>
          <div className="card-container">
            {filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((user) => (
              <UserCard key={user.id} user={user} showEditModal={showEditModal} deleteUser={deleteUser} />
            ))}
          </div>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} style={{ marginRight: 8 }}>
              上一頁
            </Button>
            <Button disabled={currentPage * pageSize >= filteredUsers.length} onClick={() => setCurrentPage(currentPage + 1)}>
              下一頁
            </Button>
          </div>
        </>
      ),
    },
    {
      key: 'table',
      label: '使用者詳細資料',
      children: (
        <UserTable
          filteredUsers={filteredUsers}
          loading={loading}
          currentPage={currentPage}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          showEditModal={showEditModal}
          
        />
      ),
    },
  ]; // 定義頁籤內容

  return (
    <div className="container">
      <Input
        placeholder="搜尋..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      /> {/* 搜尋輸入框 */}
      <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16 }}>
        新增使用者
      </Button> {/* 新增使用者按鈕 */}
      <Tabs activeKey={tab} onChange={setTab} items={items} /> {/* 頁籤 */}

      <UserModal
        title="編輯使用者"
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        user={editingUser}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleUploadChange={handleEditUploadChange}
        fileList={editFileList}
      /> {/* 編輯使用者模態窗口 */}

      <UserModal
        title="新增使用者"
        isModalVisible={isAddModalVisible}
        handleOk={handleAddUser}
        handleCancel={handleCancel}
        user={newUser}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleUploadChange={handleNewUploadChange}
        fileList={newFileList}
      /> {/* 新增使用者模態窗口 */}
    </div>
  );
};

export default UserManagement; // 匯出 UserManagement 組件
