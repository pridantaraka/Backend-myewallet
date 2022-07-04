const db = require('../helpers/db');

//start getalluser
exports.getAllUsers = (cb) =>{
    db.query('SELECT * FROM users ORDER BY id_user ASC', (err, res)=>{
        cb(res.rows);
    });
};
//end

//start createuser
exports.createUsers = (data, cb)=>{
    const q = 'INSERT INTO users (email, password, username, pin) VALUES ($1, $2, $3, $4) RETURNING *';
    const val = [data.email, data.password, data.username, data.pin];
    db.query(q, val, (err,res)=>{
        if (res) {
            cb(err, res.rows);
        }else{
            cb(err);
        }
    });
};
//end

//start updateuser
exports.updateUsers = (id_user,data,cb)=>{
    const q = 'UPDATE users SET email=$1, password=$2, username=$3, pin=$4 WHERE id_user=$5 RETURNING *';
    const val = [data.email, data.password, data.username, data.pin, id_user];
    db.query(q, val, (err,res)=>{
        cb(res.rows);
    });
};
//end

//start deleteuser
exports.deleteUsers = (id_user, cb)=>{
    const q = 'DELETE FROM users WHERE id_user=$1 RETURNING *';
    const val = [id_user];
    db.query(q, val, (err,res)=>{
        cb(res.rows);
    });
};
//end