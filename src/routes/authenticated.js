const authenticated = require('express').Router();
const authenController = require('../controllers/authenticated');
const uploadProfile = require('../middleware/uploadProfile');
const rules = require('./authentedValidator');
const validation = require('../middleware/validation');
const authMw = require('../middleware/auth');
const checkPwd =require('../middleware/pwdCheck');

authenticated.get('/status', authMw, authenController.getUserlogin);
authenticated.get('/getUsers', authMw,authenController.getAllUsers);
authenticated.get('/getTransaction', authMw, authenController.getAllTransaction);
authenticated.get('/history', authMw, authenController.getHistoryTransaction);
authenticated.post('/transfer', authMw, ...rules.ruleTransfer, validation, authenController.transfer);
authenticated.patch('/update', authMw, uploadProfile,...rules.editProfile, validation, authenController.editProfiles);
authenticated.patch('/pin', authMw, ...rules.changePin, validation, authenController.editUsersPin);
authenticated.patch('/pwd', authMw, checkPwd,...rules.changePwd, validation, authenController.editUserPwd);
authenticated.patch('/topup', authMw,...rules.topupRule,validation, authenController.topUp);


module.exports = authenticated;