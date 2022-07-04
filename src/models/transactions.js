const db = require('../helpers/db');

exports.getAllTransactions = (cb) =>{
    db.query('SELECT * FROM transaction ORDER BY id_user ASC', (err, res)=>{
        cb(res.rows);
    });
};

//start createTransaction
exports.createTransaction = (data, cb)=>{
    const q = 'INSERT INTO transaction (time_transaction, recipient_id, sander_id, notes, id_user, amount, id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const val = [data.time_transaction, data.recipient_id, data.sander_id, data.notes, data.id_user, data.amount, data.id];
    db.query(q, val, (err,res)=>{
        if (res) {
            cb(err, res.rows);
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