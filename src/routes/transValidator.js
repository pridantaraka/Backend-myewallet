const { body } = require('express-validator');

const transValidator = [
    body('amount')
        .isLength({min:1}).isNumeric().toInt().withMessage('Input your money'),
    body('recipient_id')
        .isLength({min:1}).isNumeric().toInt().withMessage('Must input 1 number'),
    body('sander_id')
        .isLength({min:1}).isNumeric().toInt().withMessage('Must input 1 number'),
    body('id')
        .isLength({min:1}).isNumeric().toInt().withMessage('Must input 1 number')
];

module.exports = transValidator;