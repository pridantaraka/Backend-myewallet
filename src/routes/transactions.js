const transactions = require('express').Router();
// const { body } = require('express-validator');
const transControll = require('../controllers/transactions');
const transRule = require('./transValidator');
const validation = require('../middleware/validation');

transactions.get('/', transControll.getAllTransactions);
transactions.get('/:id', transControll.getTransbyId);
transactions.post('/', ...transRule, validation, transControll.createTransactions);
transactions.patch('/:id', ...transRule, validation, transControll.updateTransactions);
transactions.delete('/:id', transControll.deleteTransactions);

module.exports = transactions;