const authenticated = require('express').Router();
const authenController = require('../controllers/authenticated');
const uploadProfile = require('../middleware/uploadProfile');
const rules = require('./authentedValidator');
const validation = require('../middleware/validation');
const authMw = require('../middleware/auth');
const checkPwd =require('../middleware/pwdCheck');

authenticated.get('/status', authMw, authenController.getUserlogin);
authenticated.get('/history', authMw, authenController.getHistoryTransaction);
authenticated.post('/transfer', ...rules.ruleTransfer, validation, authMw, authenController.transfer);
authenticated.patch('/update', uploadProfile,...rules.editProfile, validation, authMw, authenController.editProfiles);
authenticated.patch('/pin', ...rules.changePin, validation, authMw, authenController.editUsersPin);
authenticated.patch('/pwd', checkPwd,...rules.changePwd, validation, authMw, authenController.editUserPwd);
authenticated.patch('/topup', ...rules.topupRule,validation, authMw, authenController.topUp);

module.exports = authenticated;