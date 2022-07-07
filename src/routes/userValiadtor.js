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
];
//end

module.exports = UserValidator;