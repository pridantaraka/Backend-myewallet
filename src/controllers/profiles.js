const response = require('../helpers/standartResponse');
const profileModels = require('../models/profiles');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

exports.getAllProfiles = (req, res)=>{
    profileModels.getAllProfiles((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};

//start create profiles
exports.createProfiles = (req, res) =>{
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), 400);
    }
    profilesModels.createUsers(req.body, (err, results)=>{
        if(err){  
            return errorResponse(err,res);
        }
        return response(res, 'Create User successfully', results[0]);    
    });
};
//end