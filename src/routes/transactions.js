const transactions = require('express').Router();

const transControll = require('../controllers/transactions');

transactions.get('/', transControll.getAllTransactions);

module.exports = transactions;