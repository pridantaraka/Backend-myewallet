const response = require('./standartResponse');
const errorHendling = (msg, param, location = 'body')=>[
    {
        msg,
        param,
        location
    }
];

const errorResponse = (err, res) =>{
    //start uservalidator
    if(err.code === '23505' && err.detail.includes('email')){
        const eres = errorHendling('Email already exists','email');
        return response(res, 'Error', eres ,400);
    }if(err.code === '23505' && err.detail.includes('username')){
        const eres = errorHendling('Username already exists','username');
        return response(res, 'Error', eres ,400);
    }
    //end user

    return response(res, 'Error', null, 400);
};

module.exports = errorResponse;