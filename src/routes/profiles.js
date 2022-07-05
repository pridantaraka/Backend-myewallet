const profiles = require('express').Router();
const { body } = require('express-validator');
const profilesControll = require('../controllers/profiles');

const profileValidator = [
    body('id_user')
        .isLength({min:1}).isNumeric().withMessage('id must number'),
    body('phonenumber')
        .isLength({min:10}).isNumeric().withMessage('Number phone must 10 number')
];

profiles.get('/', profilesControll.getAllProfiles);
profiles.get('/:id', profilesControll.getProfilebyId);
profiles.post('/', ...profileValidator,profilesControll.createProfiles);
profiles.patch('/:id', ...profileValidator, profilesControll.updateProfiles);
profiles.delete('/:id', profilesControll.deleteProfiles);

module.exports = profiles;