const response = require('../helpers/standartResponse');
const transactionsModels = require('../models/transactions');
const errorResponse = require('../helpers/errorResponse');
const {LIMIT_DATA} = process.env;

//get all Transaction
exports.getAllTransactions = (req, res)=>{
    const {searchBy ='' ,search='', sortType='ASC', limit=parseInt(LIMIT_DATA), page=1} = req.query;
    const offset = (page-1)*limit;
    transactionsModels.getAllTransactions(searchBy, search, sortType, limit, offset, (err, results)=>{
        if (results.length < 1) {
            return res.redirect('/404');
        }
        const pageInfo = {};
        transactionsModels.countAllTransactions(search, (err, totalData)=>{
            pageInfo.totalData = totalData;
            pageInfo.totalPage = Math.ceil(totalData/limit);
            pageInfo.currentPage = parseInt(page);
            pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
            pageInfo.provPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
            return response(res, 'List All Transaction', results, pageInfo);
        });
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