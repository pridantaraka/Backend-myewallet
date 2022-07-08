const db = require('../helpers/db');
const {LIMIT_DATA} = process.env;

//start getAllprofile
exports.getAllProfiles = (searchBy, keyword, sortType, limit=parseInt(LIMIT_DATA), offset=0, cb) =>{
    db.query(`SELECT * FROM profiles WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY id_profile ${sortType} LIMIT $1 OFFSET $2`, [limit, offset], (err, res)=>{
        cb(err, res.rows);
    }); 
};
//end

// start countAllprofile
exports.countAllProfiles = (keyword, cb) => {
    db.query(`SELECT * FROM profiles WHERE fullname LIKE '%${keyword}%' `, (err, res)=>{
        cb(err, res.rowCount);
    });
};
//end

//start get Profile by id
exports.getProfilebyId = (id_profile, cb) =>{
    const q = 'SELECT * FROM profiles WHERE id_profile=$1';
    db.query(q, [id_profile], (err, res)=>{
        cb(err, res);
    });
};
//end

//start createProfiles
exports.createProfiles = (data, picture, cb)=>{
    const q = 'INSERT INTO profiles (phonenumber, fullname, balance, picture, id_user) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const val = [data.phonenumber, data.fullname, data.balance, picture, data.id_user];
    db.query(q, val, (err,res)=>{
        if (res) {
            cb(err, res);
        }else{
            cb(err);
        }
    });
};
//end

//start updateuser
exports.updateProfiles = (id_profile,data,picture,cb)=>{
    const q = 'UPDATE profiles SET phonenumber=$1, fullname=$2, balance=$3, picture=$4, id_user=$5 WHERE id_profile=$6 RETURNING *';
    const val = [data.phonenumber, data.fullname, data.balance, picture, data.id_user, id_profile];
    db.query(q, val, (err,res)=>{
        if(res){
            cb(err, res);
        }else{
            cb(err);
        }
    });
};
//end

//start delete profiles
exports.deleteProfiles = (id_profile, cb)=>{
    const q = 'DELETE FROM profiles WHERE id_profile=$1 RETURNING *';
    const val = [id_profile];
    db.query(q, val, (err,res)=>{
        cb(res.rows);
    });
};
//end

