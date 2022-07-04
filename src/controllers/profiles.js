const response = require('../helpers/standartResponse');
const profilesModels = require('../models/profiles');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

exports.getAllProfiles = (req, res)=>{
    profilesModels.getAllProfiles((results)=>{
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
        return response(res, 'Create profile successfully', results[0]);    
    });
};
//end

//start delete profiles
exports.deleteProfiles = (req, res) =>{
    const {id} = req.params;
    profilesModels.deleteUsers(id, (results)=>{
        return response(res, 'profile Deleted!', results[0]); 
    });
};
//end