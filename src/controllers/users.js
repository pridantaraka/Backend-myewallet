const response = require('../helpers/standartResponse');

const userModels = require('../models/users');

exports.getAllUsers = (req, res)=>{
    userModels.getAllUsers((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};

exports.createUsers = (req, res) =>{
    userModels.createUsers(req.budy, (results)=>{
        return response(res, 'Create User successfully', results);
    });
};