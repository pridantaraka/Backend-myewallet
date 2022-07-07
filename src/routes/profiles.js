const profiles = require('express').Router();
const validatorRule = require('./profileValidator');
const profilesControll = require('../controllers/profiles');
const uploadProfile = require('../middleware/uploadProfile');
const validation = require('../middleware/validation');



profiles.get('/', profilesControll.getAllProfiles);
profiles.get('/:id', profilesControll.getProfilebyId);
profiles.post('/',  uploadProfile, ...validatorRule, validation, profilesControll.createProfiles);
profiles.patch('/:id', uploadProfile, ...validatorRule, validation, profilesControll.updateProfiles);
profiles.delete('/:id', profilesControll.deleteProfiles);

module.exports = profiles;