const users = require('express').Router();
const userController = require('../controllers/users');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');


//start user
const createUserValidator = [
    body('email')
        .isEmail().withMessage('Email Format invalid'),
    body('username')
        .isLength({ min: 4 }).withMessage('Username length minimal 5 character'),
    body('password')
        .isLength({ min: 8 }).withMessage('Username length minimal 8 character')
        .customSanitizer(async (val) =>{
            const hash = await bcrypt.hash(val, 10);
            return hash;
        }),
    body('pin')
        .isLength({ min: 6 }).withMessage('PIN must be 6 number')
        // .isAlphanumeric().withMessage('Pin must all number')
        // .customSanitizer(async (val) =>{
        //     const hash = await bcrypt.hash(val, 10);
        //     return hash;
        // })
    ,
    
];
//end

//start user page n limit
const userLimit = [
    body('limit').toInt(), 
    body('page').toInt()
];
//end

const updateUserValidator = [
    body('email')
        .isEmail().withMessage('Email Format invalid'),
    body('username')
        .isLength({ min: 5 }).withMessage('Username length minimal 5 character')
];



users.get('/', ...userLimit, userController.getAllUsers);
users.get('/:id', userController.getUserbyId);
users.post('/', ...createUserValidator,userController.createUsers);
users.patch('/:id', ...updateUserValidator, userController.updateUsers);
users.delete('/:id', userController.deleteUsers);

module.exports = users;