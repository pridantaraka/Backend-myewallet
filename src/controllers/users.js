const response = require('../helpers/standartResponse');
const userModels = require('../models/users');
const errorResponse = require('../helpers/errorResponse');
const {LIMIT_DATA} = process.env;

//start getalluser serach
exports.getAllUsers = (req, res)=>{
    const {searchBy ='' ,search='', sortType='ASC', limit=parseInt(LIMIT_DATA), page=1} = req.query;
    const offset = (page-1)*limit;
    userModels.getAllUsers(searchBy, search, sortType, limit, offset, (err, results,)=>{
        if (results.length < 1) {
            return res.redirect('/404');
        }
        const pageInfo = {};
        userModels.countAllUser(search, (err, totalData)=>{
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

//start userDetail
exports.getUserbyId = (req,res) =>{
    const {id} = req.params;
    userModels.getUserbyId(id, (err,results)=>{
        if(results.rows.length > 0){
            return response(res, 'Detail User',results.rows[0]);
        }else{
            return res.redirect('/404');
        }
    });
};
//end

//start create user
exports.createUsers = (req, res) =>{
    userModels.createUsers(req.body, (err, results)=>{
        if(err){  
            return errorResponse(err,res);
        }
        return response(res, 'Create User successfully', results[0]);    
    });
};
//end

//start updateuser
exports.updateUsers = (req, res) =>{
    const {id} = req.params;
    userModels.updateUsers(id, req.body, (err, results)=>{
        if(err){
            return errorResponse(err,res);
        }
        return response(res, 'UPDATE data success!', results[0]);
    });
};
//end

//start deleteuser
exports.deleteUsers = (req, res) =>{
    const {id} = req.params;
    userModels.deleteUsers(id, (results)=>{
        return response(res, 'User Deleted!', results[0]); 
    });
};
//end

//get all users
// exports.getAllUsers = (req, res)=>{
//     userModels.getAllUsers((results)=>{
//         return response(res, 'Massage from standard response', results);
//     });
// };
//end