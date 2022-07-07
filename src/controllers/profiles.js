const response = require('../helpers/standartResponse');
const profilesModels = require('../models/profiles');
const errorResponse = require('../helpers/errorResponse');
const {LIMIT_DATA} = process.env;

//start get all profile
exports.getAllProfiles = (req, res)=>{
    const {searchBy ='' ,search='', sortType='ASC', limit=parseInt(LIMIT_DATA), page=1} = req.query;
    const offset = (page-1)*limit;
    profilesModels.getAllProfiles(searchBy, search, sortType, limit, offset, (err, results)=>{
        if (results.length < 1) {
            return res.redirect('/404');
        }
        const pageInfo = {};
        profilesModels.countAllProfiles(search, (err, totalData)=>{
            pageInfo.totalData = totalData;
            pageInfo.totalPage = Math.ceil(totalData/limit);
            pageInfo.currentPage = parseInt(page);
            pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
            pageInfo.provPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
            return response(res, 'List All User', results, pageInfo);
        });
    });
};
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
    profilesModels.createProfiles(req.body, req.file.filename, (err, results)=>{
        if(err){  
            return errorResponse(err,res);
        }
        return response(res, 'Create Profiles successfully', results.rows[0]);    
    });
};
//end

//start update profiles
exports.updateProfiles = (req, res) =>{
    const {id} = req.params;    
    profilesModels.updateProfiles(id, req.body, req.file.filename, (err, results)=>{
        if(err){
            return errorResponse(err,res);
        }
        return response(res, 'UPDATE data success!', results.rows[0]);
    });
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