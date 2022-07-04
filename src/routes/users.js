const users = require('express').Router();
const userController = require('../controllers/users');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');


//start user
const UserValidator = [
    body('email')
        .isEmail().withMessage('Email Format invalid'),
    body('username')
        .isLength({ min: 4 }).withMessage('Username length minimal 4 character'),
    body('password')
        .isLength({ min: 8 }).withMessage('Username length minimal 8 character')
        .customSanitizer(async (val) =>{
            const hash = await bcrypt.hash(val, 10);
            return hash;
        }),
    body('pin')
        .isLength({ min: 6 }).isNumeric().withMessage('PIN must be 6 number')
        // .isAlphanumeric().withMessage('Pin must all number')
        // .customSanitizer(async (val) =>{
        //     const hash = await bcrypt.hash(val, 10);
        //     return hash;
        // })
    
];
//end

//start user page n limit
// const userLimit = [
//     body('limit').toInt(), 
//     body('page').toInt()
// ];
//end

//start Update uservalidator
// const updateUserValidator = [
//     body('email')
//         .isEmail().withMessage('Email Format invalid'),
//     body('username')
//         .isLength({ min: 4 }).withMessage('Username length minimal 4 character')
// ];
//end


users.get('/', body('limit').toInt(), body('page').toInt(), userController.getAllUsers);
users.get('/:id', userController.getUserbyId);
users.post('/', ...UserValidator,userController.createUsers);
users.patch('/:id', ...UserValidator, userController.updateUsers);
users.delete('/:id', userController.deleteUsers);

module.exports = users;