const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'users.json');
const USERS_LIMIT = 10; // 限制使用者數量

// 讀取使用者資料
const readUsers = () => {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// 寫入使用者資料
const writeUsers = (users) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf8');
};

let users = readUsers();

const getUsers = (req, res) => {
  res.json(users);
};

const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  users = users.map(user => (user.id === userId ? updatedUser : user));
  writeUsers(users);
  res.json(updatedUser);
};

const addUser = (req, res) => {
  if (users.length >= USERS_LIMIT) {
    return res.status(400).json({ message: 'User limit reached. Cannot add more users.' });
  }
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  writeUsers(users);
  res.json(newUser);
};

module.exports = { getUsers, updateUser, addUser };
