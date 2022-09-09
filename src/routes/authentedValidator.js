const { body } = require('express-validator');
const bcrypt = require('bcrypt');


exports.changePin = [
    body('pin')
        .isLength({ min: 6, max:6 }).withMessage('PIN must be 6 number') 
        .isNumeric().withMessage('PIN must be a number') 
];

exports.changePwd =[
    body('newPassword')
        .isLength({ min: 8 }).withMessage('Password length minimal 8 character')
        .customSanitizer(async (val) =>{
            const hash = await bcrypt.hash(val, 10);
            return hash;
        }).optional({nullable:true}),
];

exports.editProfile = [
    body('phonenumber')
        .isMobilePhone('id-ID').withMessage('Input your phone number correctly'),
    body('fullname')
        .isString().withMessage('Name Must be Alphabet')
];

exports.topupRule=[
    body('balance')
        .isLength({min:1}).isNumeric().toInt().withMessage('Input your Money with number'),
    body('type_id')
        .isLength({min:1}).isNumeric().toInt().withMessage('Must input 1 number'),
    body('time_transaction')
        .isISO8601().withMessage('Must input Date (ISO8601)')
];

exports.ruleTransfer = [
    body('amount')
        .isLength({min:1}).isNumeric().toInt().withMessage('Input your Money with number'),
    body('time_transaction')
        .isISO8601().withMessage('Must input Date (ISO8601)')
];