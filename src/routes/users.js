const users = require('express').Router();
const userController = require('../controllers/users');
const { body } = require('express-validator');

const createUserValidator = [
    body('email')
        // .isEmpty().withMessage('Email cannot be empty')
        .isEmail().withMessage('Email Format invalid'),
    body('username')
        .isLength({ min: 5 }).withMessage('Username length minimal 5 character')
];
const updateUserValidator = [
    body('email')
        .isEmpty().withMessage('Email cannot be empty')
        .isEmail().withMessage('Email Format invalid'),
    body('username')
        .isLength({ min: 5 }).withMessage('Username length minimal 5 character')
];

users.get('/', userController.getAllUsers);
users.post('/', ...createUserValidator,userController.createUsers);
users.patch('/:id', ...updateUserValidator, userController.updateUsers);
users.delete('/:id', userController.deleteUsers);

module.exports = users;