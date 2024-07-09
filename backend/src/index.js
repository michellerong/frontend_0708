const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const defaultImage = 'http://localhost:5000/user.png';

let users = [
  { id: 1, name: 'Alice', gender: 'Female', birthday: '1990-01-01', occupation: '工程師', phone: '1234567890', image: 'user.png' },
  { id: 2, name: 'Bob', gender: 'Male', birthday: '1985-02-02', occupation: '教師', phone: '0987654321', image: 'user.png' },
  { id: 3, name: 'Charlie', gender: 'Male', birthday: '1992-03-03', occupation: '學生', phone: '1122334455', image: 'user.png' },
  { id: 4, name: 'David', gender: 'Male', birthday: '1988-04-04', occupation: '無業', phone: '6677889900', image: 'user.png' },
  { id: 5, name: 'Eve', gender: 'Female', birthday: '1995-05-05', occupation: '工程師', phone: '9988776655', image: 'user.png' },
  { id: 6, name: 'Fiona', gender: 'Female', birthday: '1991-06-06', occupation: '教師', phone: '5566778899', image: 'user.png' },
  { id: 7, name: 'George', gender: 'Male', birthday: '1983-07-07', occupation: '學生', phone: '4433221100', image: 'user.png' },
  { id: 8, name: 'Hannah', gender: 'Female', birthday: '1989-08-08', occupation: '無業', phone: '3344556677', image: 'user.png' },
  { id: 9, name: 'Ivy', gender: 'Female', birthday: '1993-09-09', occupation: '工程師', phone: '2233445566', image: 'user.png' },
  { id: 10, name: 'Jack', gender: 'Male', birthday: '1987-10-10', occupation: '教師', phone: '9988775544', image: 'user.png' }
];

app.get('/users', (req, res) => {
  const search = req.query.search || '';
  const filteredUsers = users.filter(user =>
    user.name.includes(search) || user.gender.includes(search) || user.birthday.includes(search) ||
    user.occupation.includes(search) || user.phone.includes(search)
  );
  filteredUsers.forEach(user => {
    if (!user.image) {
      user.image = defaultImage;
    }
  });
  res.json(filteredUsers);
});

app.post('/users', (req, res) => {
  const { name, gender, birthday, occupation, phone, image } = req.body;

  if (!name || !gender || !birthday || !occupation || !phone) {
    return res.status(400).json({ message: '缺少必要字段' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    gender,
    birthday,
    occupation,
    phone,
    image: image || defaultImage
  };

  users.push(newUser);
  res.json(newUser);
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, gender, birthday, occupation, phone, image } = req.body;

  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: '使用者未找到' });
  }

  const updatedUser = {
    id: parseInt(id),
    name,
    gender,
    birthday,
    occupation,
    phone,
    image: image || defaultImage
  };

  users[userIndex] = updatedUser;
  res.json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: '使用者未找到' });
  }

  users.splice(userIndex, 1);
  res.json({ message: '使用者已刪除' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

