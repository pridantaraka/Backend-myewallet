exports.getAllTransactions = (req, res)=>{
    return res.json({
        success: true,
        message: 'List all transactions'
    });
};