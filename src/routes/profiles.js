const profiles = require('express').Router();

const profilesControll = require('../controllers/profiles');

profiles.get('/', profilesControll.getAllProfiles);

module.exports = profiles;