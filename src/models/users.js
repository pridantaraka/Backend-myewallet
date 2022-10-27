const db = require('../helpers/db');

// const {LIMIT_DATA} = process.env;

//start getalluser
exports.getAllUsers = (searchBy, keyword, sortType, limit, offset=0, cb) =>{
    db.query(`SELECT * FROM users WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY id_user ${sortType} LIMIT $1 OFFSET $2`, [limit, offset], (err, res)=>{
        cb(err, res.rows);
    });
};
//end

//start countAlluser
exports.countAllUser = (keyword, cb) => {
    db.query(`SELECT * FROM users WHERE email LIKE '%${keyword}%' `, (err, res)=>{
        cb(err, res.rowCount);
    });
};
//end

//start get user by id
exports.getUserbyId = (id_user, cb) => {
    const q = 'SELECT * FROM users WHERE id_user=$1';
    db.query(q, [id_user], (err, res)=>{
        cb(err, res);
    });
};
//end

//start getuserbyemail
exports.getUserbyemail = (email, cb) => {
    const q = 'SELECT * FROM users WHERE email=$1';
    db.query(q, [email], (err, res)=>{
        cb(err, res);
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

//start updateuserPin
exports.updateUsersPin = (email, data,cb)=>{
    let val = [email];

    const filtered = {};
    const obj = {
        email:data.email,
        username:data.username,
        password:data.password,
        pin:data.pin,
    };

    for(let x in obj){
        if(obj[x]!==null){
            if (obj[x]!==undefined) {
                filtered[x] = obj [x];
                val.push(obj[x]);
            }
            
        }
    }

    const key = Object.keys(filtered);
    const finalResult = key.map((o, ind) => `${o}=$${ind+2}`);

    const q = `UPDATE users SET ${finalResult} WHERE email=$1 RETURNING *`;
    db.query(q, val, (err,res)=>{
        if(res){
            cb(err, res);
        }else{
            cb(err);
        }
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

// //start getalluser
// exports.getAllUsers = (cb) =>{
//     db.query('SELECT * FROM users ORDER BY id_user ASC', (err, res)=>{
//         cb(res.rows);
//     });
// };
// //end

//start updateuser
exports.updateUsers = (id_user,data,cb)=>{
    const q = 'UPDATE users SET email=$1, password=$2, username=$3, pin=$4 WHERE id_user=$5 RETURNING *';
    const val = [data.email, data.password, data.username, data.pin, id_user];
    db.query(q, val, (err,res)=>{
        if(res){
            cb(err, res.rows);
        }else{
            cb(err);
        }
    });
};
//end