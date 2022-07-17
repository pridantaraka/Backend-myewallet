const authenticated = require('express').Router();
const authenController = require('../controllers/authenticated');
const uploadProfile = require('../middleware/uploadProfile');
const rules = require('./authentedValidator');
const validation = require('../middleware/validation');
const authMw = require('../middleware/auth');

authenticated.get('/status', authMw, authenController.getProfileid);
authenticated.post('/transfer', ...rules.ruleTransfer, validation, authMw, authenController.transfer);
authenticated.patch('/update', uploadProfile,...rules.editProfile, validation, authMw, authenController.editProfiles);
authenticated.patch('/pin', ...rules.changePin, validation, authMw, authenController.editUsersPin);
authenticated.patch('/pwd', ...rules.changePwd, validation, authMw, authenController.editUserPwd);
authenticated.patch('/topup', authMw, authenController. );

module.exports = authenticated;