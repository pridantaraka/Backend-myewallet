const db = require('../helpers/db');

exports.getAllUsers = (cb) =>{
    db.query('SELECT * FROM users', (err, res)=>{
        console.log(res);
        cb(res.rows);
    });
};