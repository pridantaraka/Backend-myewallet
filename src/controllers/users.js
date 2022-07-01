const response = require('../helpers/standartResponse');
const userModels = require('../models/users');
const { validationResult } = require('express-validator');

exports.getAllUsers = (req, res)=>{
    userModels.getAllUsers((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};

exports.createUsers = (req, res) =>{
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), 400);
    }
    userModels.createUsers(req.body, (results)=>{
        return response(res, 'Create User successfully', results[0]);
    });
};

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

exports.deleteUsers = (req, res) =>{
    const {id} = req.params;
    userModels.deleteUsers(id, (results)=>{
        return response(res, 'User Deleted!', results[0]); 
    });
};