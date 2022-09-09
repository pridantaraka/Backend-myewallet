const response = require('../helpers/standartResponse');
// const profilesModels = require('../models/profiles');
const regisModel = require('../models/auth');
// const authMw = require('../middleware/auth');
const errorResponse = require('../helpers/errorResponse');
const userModels = require('../models/users');
const bcrypt = require('bcrypt');
const {LIMIT_DATA} = process.env;

//start profileDetail
exports.getUserlogin = (req,res) =>{
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

exports.getAllUsers = (req,res) =>{
    regisModel.getAllUsers((err,results)=>{
        if(results.rows.length > 0){
            return response(res, 'All User',results.rows);
        }else{
            return res.redirect('/404');
        }
    });
};

exports.getAllTransaction = (req,res) =>{
    const id = req.authUser.id_user;
    regisModel.getAllTransaction(id, (err,results)=>{
        if(results.rows.length > 0){
            return response(res, 'All Transaction',results.rows);
        }else{
            return res.redirect('/404');
        }
    });
};

exports.getHistoryTransaction = (req,res) =>{
    const id = req.authUser.id_user;
    const {sortType='ASC', limit=parseInt(LIMIT_DATA), page=1} = req.query;
    const offset = (page-1)*limit;
    regisModel.getTransaction(id, sortType, limit, offset, (err, results)=>{
        if (results.length < 1) {
            return res.redirect('/404');
        }
        const pageInfo = {};
        regisModel.countTransaction(id, (err, totalData)=>{
            pageInfo.totalData = totalData;
            pageInfo.totalPage = Math.ceil(totalData/limit);
            pageInfo.currentPage = parseInt(page);
            pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
            pageInfo.provPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
            return response(res, 'List All Transaction', results, pageInfo);
        });
    });
};


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
        if(err){
            return errorResponse(err,res);
        }
        return response(res, 'TOPUP success!', results.rows[0]);
    });
};


exports.editUsersPin = (req, res) =>{
    const id = req.authUser.id_user;
    userModels.getUserbyId(id, (err, results1)=>{
        if(results1.rows[0].pin === req.body.currentPin){
            regisModel.editUsersPin(id, req.body, (err)=>{
                if(err){
                    return errorResponse(err,res);
                }
                return response(res, 'UPDATE pin success!');   
            });
        }else{
            return response(res, 'Your pin not match');
        }
    });
};

exports.editUserPwd = (req, res) =>{
    const id = req.authUser.id_user;
    const {plainPassword} = req.body;
    if(plainPassword === req.body.repeatPassword){
        userModels.getUserbyId(id, (err, results1)=>{ 
            bcrypt.compare(req.body.currentPassword,results1.rows[0].password)
                .then((cpRes)=>{
                    if (cpRes) {
                        regisModel.editUsersPin(id, req.body,(err)=>{
                            if(err){
                                return errorResponse(err,res);
                            }
                            return response(res, 'UPDATE Password success!',); 
                        });
                    }else{
                        return response(res,'Your password not true input again');
                    }
                })
                .catch(e =>{
                    return response(res, 'Password not match',null, null, 400);
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
                return response(res, 'TRANSFER success!', results.rows[0]);   
            });
        }else{
            return response(res, 'Your pin not match');
        }
    });
};