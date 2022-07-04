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

//start create Transactions
exports.createTransactions = (req, res) =>{
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), 400);
    }
    transactionsModels.createTransactions(req.body, (err, results)=>{
        if(err){  
            return errorResponse(err,res);
        }
        return response(res, 'Create Transaction successfully', results.rows);    
    });
};
//end

//start updateTransactions
exports.updateTransactions = (req, res) =>{
    const {id} = req.params;
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), null, 400);
    }
    transactionsModels.updateTransactions(id, req.body, (err, results)=>{
        if(err){
            return errorResponse(err,res);
        }
        return response(res, 'UPDATE data success!', results.rows);
    });
};
//end

//start delete transactions
exports.deleteTransactions = (req, res) =>{
    const {id} = req.params;
    transactionsModels.deleteTransactions(id, (results)=>{
        return response(res, 'Transaction Deleted!', results[0]); 
    });
};
//end