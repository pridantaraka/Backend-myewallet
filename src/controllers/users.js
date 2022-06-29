const response = require('../helpers/standartResponse');

const userModels = require('../models/users');

exports.getAllUsers = (req, res)=>{
    userModels.getAllUsers((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};