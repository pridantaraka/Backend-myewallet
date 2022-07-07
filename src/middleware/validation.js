const { validationResult } = require('express-validator');
const response = require('../helpers/standartResponse');

const validation = (req, res, next) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return response(res, 'Error occured', error.array(), null, 400);
    }
    next();
};

module.exports = validation;