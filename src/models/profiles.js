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
    let val=[];

    const filtered = {};
    const obj = {
        picture,
        fullname: data.fullname,
        balance: data.balance,
        phonenumber: data.phonenumber,
        id_user: data.id_user,
    };

    for(let x in obj){
        if(obj[x]!==null){
            filtered[x] = obj [x];
            val.push(obj[x]);
        }
    }

    const key = Object.keys(filtered);
    const strKey = key.join();
    const finalResult = key.map((o, ind) => `$${ind+1}`);
    
    const q = `INSERT INTO profiles (${strKey}) VALUES (${finalResult}) RETURNING *`;
    db.query(q, val, (err,res)=>{
        console.log(err);
        if (res) {
            cb(err, res);
        }else{
            cb(err);
        }
    });
};
//end

//start updateuser
exports.updateProfiles = (id_profile, picture, data, cb)=>{
    let val = [id_profile];

    const filtered = {};
    const obj = {
        picture,
        fullname: data.fullname,
        balance: data.balance,
        phonenumber: data.phonenumber,
    };

    for(let x in obj){
        if(obj[x]!==null){
            filtered[x] = obj [x];
            val.push(obj[x]);
        }
    }

    const key = Object.keys(filtered);
    const finalResult = key.map((o, ind) => `${o}=$${ind+2}`);

    const q = `UPDATE profiles SET ${finalResult} WHERE id_profile=$1 RETURNING *`;
    db.query(q, val, (err,res)=>{
        cb(err, res);
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

