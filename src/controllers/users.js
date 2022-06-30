const response = require('../helpers/standartResponse');

const userModels = require('../models/users');

exports.getAllUsers = (req, res)=>{
    userModels.getAllUsers((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};

exports.createUsers = (req, res) =>{
    userModels.createUsers(req.body, (results)=>{
        return response(res, 'Create User successfully', results[0]);
    });
};

exports.updateUsers = (req, res) =>{
    const {id} = req.params;
    userModels.updateUsers(id, req.body, (results)=>{
        return response(res, 'UPDATE data success!', results[0]);
    });
};

exports.deleteUsers = (req, res) =>{
    const {id} = req.params;
    userModels.deleteUsers(id, (results)=>{
        return response(res, 'User Deleted!', results); 
    });
};