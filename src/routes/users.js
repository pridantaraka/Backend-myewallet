const users = require('express').Router();

const userController = require('../controllers/users');

users.get('/', userController.getAllUsers);
users.post('/', userController.createUsers);
users.patch('/:id', userController.updateUsers);
users.delete('/:id', userController.deleteUsers);

module.exports = users;