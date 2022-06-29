const response = require('../helpers/standartResponse');

const profileModels = require('../models/profiles');

exports.getAllProfiles = (req, res)=>{
    profileModels.getAllProfiles((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};