const users = require('express').Router();
const userController = require('../controllers/users');
const validation = require('../middleware/validation');
const userRule = require('./userValiadtor');
const { body } = require('express-validator');


users.get('/', body('limit').toInt(), body('page').toInt(), userController.getAllUsers);
users.get('/:id', userController.getUserbyId);
users.post('/', ...userRule, validation, userController.createUsers);
users.patch('/:id', ...userRule, validation, userController.updateUsers);
users.delete('/:id', userController.deleteUsers);

module.exports = users;