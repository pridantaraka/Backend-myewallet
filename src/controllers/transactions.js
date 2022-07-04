const response = require('../helpers/standartResponse');
const transactionsModels = require('../models/transactions');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');


// exports.getAllTransactions = (req, res)=>{
//     return res.json({
//         success: true,
//         message: 'List all transactions'
//     });
// };

exports.getAllTransactions = (req, res)=>{
    transactionsModels.getAllTransactions((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};

//start create user
exports.createUsers = (req, res) =>{
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), 400);
    }
    transactionsModels.createProfiles(req.body, (err, results)=>{
        if(err){  
            return errorResponse(err,res);
        }
        return response(res, 'Create Transaction successfully', results[0]);    
    });
};
//end

//start delete transactions
exports.deleteTransactions = (req, res) =>{
    const {id} = req.params;
    transactionsModels.deleteUsers(id, (results)=>{
        return response(res, 'Transaction Deleted!', results[0]); 
    });
};
//end