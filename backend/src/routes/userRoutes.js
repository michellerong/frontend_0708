const express = require('express');
const { getUsers, updateUser, addUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.put('/:id', updateUser);
router.post('/', addUser);

module.exports = router;
