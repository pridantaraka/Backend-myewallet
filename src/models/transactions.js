const db = require('../helpers/db');

exports.getAllTransactions = (cb) =>{
    db.query('SELECT * FROM transaction ORDER BY id_transaction ASC', (err, res)=>{
        cb(res.rows);
    });
};

//start createTransaction
exports.createTransactions = (data, cb)=>{
    const q = 'INSERT INTO transaction (time_transaction, recipient_id, sander_id, notes, amount, id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const val = [data.time_transaction, data.recipient_id, data.sander_id, data.notes, data.amount, data.id];
    db.query(q, val, (err,res)=>{
        if (res) {
            cb(err, res);
        }else{
            cb(err);
        }
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

//start updateuser
exports.updateTransactions = (id_transaction,data,cb)=>{
    const q = 'UPDATE transaction SET time_transaction=$1, recipient_id=$2, sander_id=$3, notes=$4, amount=$5, id=$6 WHERE id_transaction=$7 RETURNING *';
    const val = [data.time_transaction, data.recipient_id, data.sander_id, data.notes, data.amount, data.id, id_transaction];
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