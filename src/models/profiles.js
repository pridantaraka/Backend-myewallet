const db = require('../helpers/db');

exports.getAllProfiles = (cb) =>{
    db.query('SELECT * FROM profiles ORDER BY id_user ASC', (err, res)=>{
        cb(res.rows);
    });
};

//start createTransaction
exports.createProfiles = (data, cb)=>{
    const q = 'INSERT INTO profiles (id_user, phonenumber, fullname, balance, picture) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const val = [data.id_user, data.phonenumber, data.fullname, data.balance, data.picture];
    db.query(q, val, (err,res)=>{
        if (res) {
            cb(err, res.rows);
        }else{
            cb(err);
        }
    });
};
//end