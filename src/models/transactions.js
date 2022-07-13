const db = require('../helpers/db');
const {LIMIT_DATA} = process.env;

//start getAllTransaction
exports.getAllTransactions = (searchBy, keyword, sortType, limit=parseInt(LIMIT_DATA), offset=0, cb) =>{
    db.query(`SELECT * FROM transaction WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY id_transaction ${sortType} LIMIT $1 OFFSET $2`, [limit, offset], (err, res)=>{
        console.log(err);
        cb(err, res.rows);
    });
};
//end

//start countalltransaction
exports.countAllTransactions = (keyword, cb) => {
    db.query(`SELECT * FROM transaction WHERE notes LIKE '%${keyword}%' `, (err, res)=>{
        console.log(err);
        cb(err, res.rowCount);
    });
};
//end

//start get transaction by id
exports.getTransbyId = (id_transaction, cb) =>{
    const q = 'SELECT * FROM transaction WHERE id_transaction=$1';
    db.query(q, [id_transaction], (err, res)=>{
        cb(err, res);
    });
};
//end

//start createTransaction
exports.createTransactions = (data, cb)=>{
    const q = 'INSERT INTO transaction (time_transaction, notes, recipient_id, sander_id, amount, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const val = [data.time_transaction, data.notes, data.recipient_id, data.sander_id, data.amount, data.type_id];
    db.query(q, val, (err,res)=>{
        console.log(val);
        if (res) {
            cb(err, res);
        }else{
            cb(err);
        }
    });
};
//end

//start updateuser
exports.updateTransactions = (id_transaction,data,cb)=>{
    const q = 'UPDATE transaction SET time_transaction=$1 notes=$2, amount=$3, id=$4 WHERE id_transaction=$5 RETURNING *';
    const val = [data.time_transaction, data.notes, data.amount, data.id, id_transaction];
    db.query(q, val, (err,res)=>{
        if(res){
            cb(err, res);
        }else{
            cb(err);
        }
    });
};
//end

//start delete transaction
exports.deleteTransactions = (id_transaction, cb)=>{
    const q = 'DELETE FROM transaction WHERE id_transaction=$1 RETURNING *';
    const val = [id_transaction];
    db.query(q, val, (err,res)=>{
        cb(res.rows);
    });
};
//end