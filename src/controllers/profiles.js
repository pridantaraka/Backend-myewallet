const response = require('../helpers/standartResponse');
const profilesModels = require('../models/profiles');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

exports.getAllProfiles = (req, res)=>{
    profilesModels.getAllProfiles((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};

//start CreateProfile
exports.createProfiles = (req, res) =>{
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), null, 400);
    }
    profilesModels.createProfiles(req.body, (err, results)=>{
        if(err){  
            return errorResponse(err,res);
        }
        return response(res, 'Create Profiles successfully', results.rows);    
    });
};
//end

//start update profiles
exports.updateProfiles = (req, res) =>{
    const {id} = req.params;
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), null, 400);
    }
    profilesModels.updateProfiles(id, req.body, (err, results)=>{
        if(err){
            return errorResponse(err,res);
        }
        return response(res, 'UPDATE data success!', results.rows);
    });
};
//end

//start delete profiles
exports.deleteProfiles = (req, res) =>{
    const {id} = req.params;
    profilesModels.deleteProfiles(id, (results)=>{
        return response(res, 'profile Deleted!', results[0]); 
    });
};
//end