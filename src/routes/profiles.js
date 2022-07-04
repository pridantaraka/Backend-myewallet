const profiles = require('express').Router();

const profilesControll = require('../controllers/profiles');

profiles.get('/', profilesControll.getAllProfiles);
profiles.delete('/:id', profilesControll.deleteProfiles);

module.exports = profiles;