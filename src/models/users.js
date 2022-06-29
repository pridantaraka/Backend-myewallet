const db = require('../helpers/db');

exports.getAllUsers = (cb) =>{
    db.query('SELECT * FROM user', (err, res)=>{
        cb(res.rows);
    });
};