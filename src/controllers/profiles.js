const response = require('../helpers/standartResponse');

const profilesModels = require('../models/profiles');

const { validationResult } = require('express-validator');

const errorResponse = require('../helpers/errorResponse');

const upload = require('../helpers/upload').single('picture');
// const {LIMIT_DATA} = process.env;

//start get all profile
exports.getAllProfiles = (req, res)=>{
    profilesModels.getAllProfiles((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};
//end

//start get all profile
// exports.getAllProfiles = (req, res)=>{
//     const {sortBy ='' ,search='', sortType='ASC', limit=parseInt(LIMIT_DATA), page=1} = req.query;
//     const offset = (page-1)*limit;
//     profilesModels.getAllProfiles(sortBy, search, sortType, limit, offset, (err, results,)=>{
//         if (results < 1) {
//             return res.redirect('/404');
//         }
//         const pageInfo = {};
//         profilesModels.countAllProfiles(search, (err, totalData)=>{
//             pageInfo.totalData = totalData;
//             pageInfo.totalPage = Math.ceil(totalData/limit);
//             pageInfo.currentPage = parseInt(page);
//             pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
//             pageInfo.provPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
//             return response(res, 'List All User', results, pageInfo);
//         });
//     });
// };
//end

//start profileDetail
exports.getProfilebyId = (req,res) =>{
    const {id} = req.params;
    profilesModels.getProfilebyId(id, (err,results)=>{
        if(results.rows.length > 0){
            return response(res, 'Detail User',results.rows[0]);
        }else{
            return res.redirect('/404');
        }
    });
};
//end

//start CreateProfile
exports.createProfiles = (req, res) =>{
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), null, 400);
    }
    profilesModels.createProfiles(req.body, (err, results)=>{
        if(err){  
            return errorResponse(err,res);
        }
        return response(res, 'Create Profiles successfully', results.rows);    
    });
};
//end

//start update profiles
exports.updateProfiles = (req, res) =>{
    const {id} = req.params;
    // const {upload} = req.body;
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), null, 400);
    }
    // upload(req, res, (err1)=>{
    //     if(err1){
    //         return response(res, `Failed to update: ${err1.massage}`, null, null, 400);
    //     }
    profilesModels.updateProfiles(id, req.body, (err, results)=>{
        if(err){
            return errorResponse(err,res);
        }
        return response(res, 'UPDATE data success!', results.rows);
    });
    // });
};
//end

//start delete profiles
exports.deleteProfiles = (req, res) =>{
    const {id} = req.params;
    profilesModels.deleteProfiles(id, (results)=>{
        return response(res, 'profile Deleted!', results[0]); 
    });
};
//end