const db = require('../helpers/db');

exports.getAllProfiles = (cb) =>{
    db.query('SELECT * FROM profiles', (err, res)=>{
        cb(res.rows);
    });
};