const response = require('../helpers/standartResponse');
// const profilesModels = require('../models/profiles');
const regisModel = require('../models/auth');
// const {LIMIT_DATA} = process.env;
// const authMw = require('../middleware/auth');
const errorResponse = require('../helpers/errorResponse');
// const userModels = require('../models/users');

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


exports.editUsersPin = (req, res) =>{
    const id = req.authUser.id_user;
    regisModel.editUsersPin(id, req.body, (err, results)=>{
        if(err){
            return errorResponse(err,res);
        }
        return response(res, 'UPDATE data success!', results.rows[0]);
    });
};

exports.transfer = (req, res) => {
    const id = req.authUser.id_user;
    regisModel.transfer(id, req.body, (err, results)=>{
        if(err){
            return errorResponse(err,res);
        }
        return response(res, 'TRANSFER data success!', results.rows[0]);
    });
};