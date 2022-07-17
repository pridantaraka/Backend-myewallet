const response = require('../helpers/standartResponse');
// const profilesModels = require('../models/profiles');
const regisModel = require('../models/auth');
// const {LIMIT_DATA} = process.env;
// const authMw = require('../middleware/auth');
const errorResponse = require('../helpers/errorResponse');
const userModels = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//start profileDetail
exports.getProfileid = (req,res) =>{
    const id = req.authUser.id_user;
    regisModel.getProfileid(id, (err,results)=>{
        if(results.rows.length > 0){
            return response(res, 'Detail User',results.rows[0]);
        }else{
            return res.redirect('/404');
        }
    });
};
//end

exports.editProfiles = (req, res) =>{
    const id = req.authUser.id_user;
    let filename = null;
    if(req.file){
        filename = req.file.filename;
    }
    regisModel.editProfiles(id, filename, req.body, (err, results)=>{
        if(err){
            return errorResponse(err,res);
        }
        return response(res, 'UPDATE data success!', results.rows[0]);
    });
};

exports.topUp = (req, res) =>{
    const id = req.authUser.id_user;
    regisModel.updateBalance(id, req.body, (err, results)=>{
        console.log(err);
        if(err){
            return errorResponse(err,res);
        }
        return response(res, 'UPDATE data success!', results.rows[0]);
    });
};


exports.editUsersPin = (req, res) =>{
    const id = req.authUser.id_user;
    userModels.getUserbyId(id, (err, results1)=>{
        if(results1.rows[0].pin === req.body.currentPin){
            
            regisModel.editUsersPin(id, req.body, (err, results)=>{
                if(err){
                    return errorResponse(err,res);
                }
                return response(res, 'UPDATE data success!', results.rows[0]);   
            });
        }else{
            return response(res, 'Your pin not match');
        }
    });
};

exports.editUserPwd = (req, res) =>{
    const id = req.authUser.id_user;
    const newPassword = req.body.newPassword;
    if(newPassword === req.body.repeatPassword){
        userModels.getUserbyId(id, (err, results1)=>{
            bcrypt.compare(req.body.currentPassword, results1.rows[0].password)
                .then((cpRes)=>{
                    if (cpRes) {
                        bcrypt.hash(newPassword,10, (err,hash)=>{
                            results1.rows[0].password = hash;
                            regisModel.editUsersPin(id, req.body,(err,results)=>{
                                if(err){
                                    return errorResponse(err,res);
                                }
                                return response(res, 'UPDATE data success!', results.rows[0]); 
                            });
                        });
                        return response(res, 'Login success',);
                    }
                    return response(res, 'Email or password not match',null, null, 400);
                })
                .catch(e =>{
                    return response(res, 'Email or password not match',null, null, 400);
                });      
        });
    }else{
        return response(res, 'Your Password not match');
    }
};

exports.transfer = (req, res) => {
    const id = req.authUser.id_user;
    userModels.getUserbyId(id, (err, results1)=>{
        if(results1.rows[0].pin === req.body.pin){
            regisModel.transfer(id, req.body, (err, results)=>{
                if(err){
                    return errorResponse(err,res);
                }
                return response(res, 'UPDATE data success!', results.rows[0]);   
            });
        }else{
            return response(res, 'Your pin not match');
        }
    });
};