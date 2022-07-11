const { body } = require('express-validator');
const bcrypt = require('bcrypt');

//start user
exports.register = [
    body('email')
        .isEmail().withMessage('Email Format invalid'),
    body('username')
        .isLength({ min: 4 }).withMessage('Username length minimal 4 character'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password length minimal 8 character')
        .customSanitizer(async (val) =>{
            const hash = await bcrypt.hash(val, 10);
            return hash;
        })
];
//end

//start pin
exports.pin = [
    body('email')
        .isEmail().withMessage('Email Format invalid'),
    body('pin')
        .isLength({ min: 6, max:6 }).withMessage('PIN must be 6 number') 
        .isNumeric().withMessage('PIN must be a number') 
];
//end

//start pin
exports.login = [
    body('email')
        .isEmail().withMessage('Email Format invalid'),
];
//end