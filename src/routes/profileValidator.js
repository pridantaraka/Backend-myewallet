const { body } = require('express-validator');

const profileValidator = [
    body('id_user')
        .toInt().isNumeric().withMessage('id must number'),
    body('phonenumber')
        .isMobilePhone('id-ID').withMessage('Input your phone number correctly'),
    body('fullname')
        .isString().withMessage('Name Must be Alphabet'),
    body('balance')
        .isNumeric().toInt().withMessage('input your money')
];

module.exports = profileValidator;