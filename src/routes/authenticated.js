const authenticated = require('express').Router();
const authenController = require('../controllers/authenticated');
// const validatorRule = require('./profileValidator');
// const validation = require('../middleware/validation');
const authMw = require('../middleware/auth');

authenticated.get('/status', authMw,authenController.getProfileid);
// authenticated.post('/profile', ...validatorRule, validation,authenController.createProfile);
// authenticated.patch('/update', authenController.loginUser);

module.exports = authenticated;