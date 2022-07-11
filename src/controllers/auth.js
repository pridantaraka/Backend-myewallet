const response = require('../helpers/standartResponse');
const userModels = require('../models/users');
const errorResponse = require('../helpers/errorResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    req.body.pin = null;
    userModels.createUsers(req.body, (err) => {
        if(err){  
            return errorResponse(err,res);
        }
        return response(res, 'Register successfully', );
    });
};

exports.createPin = (req, res) => {
    const {email} = req.body;
    userModels.getUserbyemail(email, (err, result) => {
        if(result.rows.length > 0){
            const user = result.rows[0];
            if(user.pin === null){
                userModels.updateUsersPin(user.id_user, {pin: req.body.pin}, (err, resultsUpdate)=>{
                    console.log(err);
                    const userUpdated = resultsUpdate.rows[0];
                    if(userUpdated.email === user.email){
                        return response(res, 'Create Pin Success');
                    }
                });
            }else{
                return response(res, 'Error: Pin Already set', null, null, 400);
            }
        }else{
            return response(res, 'Error: Email not Found', null, null, 400);
        }
    });
};

exports.login = (req,res) =>{
    const {email, password} = req.body;
    userModels.getUserbyemail(email, (err, results) =>{
        if(results.rows.length < 1){
            return response(res, 'User not Found', null, null, 400);
        }
        const user = results.rows[0];
        bcrypt.compare(password, user.password)
            .then((cpRes)=>{
                const token = jwt.sign({id: user.id}, process.env.APP_SECRET||'secretKey');
                if (cpRes) {
                    return response(res, 'Login success', {token});
                }
                return response(res, 'Email or password not match',null, null, 400);
            })
            .catch(e =>{
                return response(res, 'Email or password not match',null, null, 400);
            });
    });
};