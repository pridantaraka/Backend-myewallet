const transactions = require('express').Router();
const { body } = require('express-validator');
const transControll = require('../controllers/transactions');

const transValidator = [
    body('amount')
        .isLength({min:1}).isNumeric().withMessage('Must input 1 number'),
    body('sander_id')
        .isLength({min:1}).isNumeric().withMessage('Must input 1 number'),
    body('id_user')
        .isLength({min:1}).isNumeric().withMessage('Must input 1 number'),
    body('id')
        .isLength({min:1}).isNumeric().withMessage('Must input 1 number')
];

transactions.get('/', transControll.getAllTransactions);
transactions.get('/:id', transControll.getTransbyId);
transactions.post('/', ...transValidator, transControll.createTransactions);
transactions.patch('/:id', ...transValidator, transControll.updateTransactions);
transactions.delete('/:id', transControll.deleteTransactions);

module.exports = transactions;