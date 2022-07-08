const response = require('../helpers/standartResponse');
const transactionsModels = require('../models/transactions');
const errorResponse = require('../helpers/errorResponse');

//get all Transaction
exports.getAllTransactions = (req, res)=>{
    transactionsModels.getAllTransactions((results)=>{
        return response(res, 'Massage from standard response', results);
    });
};
//end

//start TransactionDetail
exports.getTransbyId = (req,res) =>{
    const {id} = req.params;
    transactionsModels.getTransbyId(id, (err,results)=>{
        if(results.rows.length > 0){
            return response(res, 'Detail User',results.rows[0]);
        }else{
            return res.redirect('/404');
        }
    });
};
//end

//start create Transactions
exports.createTransactions = (req, res) =>{
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