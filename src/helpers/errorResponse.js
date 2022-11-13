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
        return response(res, 'Error', eres, null,400);
    }if(err.code === '23505' && err.detail.includes('username')){
        const eres1 = errorHendling('Username already exists','username');
        return response(res, 'Error', eres1, null,400);
    }
    //end user

    //profiles
    if(err.code === '23505' && err.detail.includes('phonenumber')){
        const eres2 = errorHendling('phonenumber already exists','phonenumber');
        return response(res, 'Error', eres2, null,400);
    }
    //end
    return response(res, 'Error', null, 400);
};

module.exports = errorResponse;