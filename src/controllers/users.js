const response = require('../helpers/standartResponse');
const userModels = require('../models/users');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

//start getalluser
exports.getAllUsers = (req, res)=>{
    userModels.getAllUsers((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};
//end

//start create user
exports.createUsers = (req, res) =>{
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), 400);
    }
    userModels.createUsers(req.body, (err, results)=>{
        if(err){  
            return errorResponse(err,res);
        }
        return response(res, 'Create User successfully', results[0]);    
    });
};
//end

//start updateuser
exports.updateUsers = (req, res) =>{
    const {id} = req.params;
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), 400);
    }
    userModels.updateUsers(id, req.body, (results)=>{
        return response(res, 'UPDATE data success!', results[0]);
    });
};
//end

//start deleteuser
exports.deleteUsers = (req, res) =>{
    const {id} = req.params;
    userModels.deleteUsers(id, (results)=>{
        return response(res, 'User Deleted!', results[0]); 
    });
};
//end