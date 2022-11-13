const db = require('../helpers/db');

exports.register = (data, cb) => {
    db.query('BEGIN', err => {
        if (err){
            console.log('err1');
        }else{
            const queryText = 'INSERT INTO users(email, password, username, pin) VALUES($1, $2, $3, $4) RETURNING id_user';
            db.query(queryText, [data.email, data.password, data.username, data.pin=123123], (err, res) => {
                console.log(data);  
                if (err) {
                    console.log(err);
                }else{
                    const insertPhotoText = 'INSERT INTO profiles(id_user) VALUES ($1) RETURNING *';
                    const insertPhotoValues = [res.rows[0].id_user];
                    db.query(insertPhotoText, insertPhotoValues, (err, res) => {
                        if (err) {
                            console.log(err);
                        }else{
                            cb(err,res);
                            db.query('COMMIT', err => {
                                if (err) {
                                    console.error('Error committing Register', err.stack);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

//start get Profile by id
exports.getProfileid = (id_user, cb) =>{
    const q = 'SELECT picture, fullname, phonenumber, email, username, balance FROM profiles p INNER JOIN users u on u.id_user = p.id_user WHERE p.id_user = $1';
    const val = [id_user];
    db.query(q, val,  (err, res)=>{
        cb(err, res);
    });
};
//end
exports.getAllUsers = (id_user, searchBy, keyword, sortType, orderBy, limit, offset, cb) =>{
    const q = `SELECT u.id_user, p.picture, p.fullname , p.phonenumber, u.email, u.username, p.balance FROM users u INNER JOIN profiles p on p.id_user = u.id_user WHERE u.id_user != $3 AND p.${searchBy} LIKE '%${keyword}%' ORDER BY ${orderBy} ${sortType} LIMIT $1 OFFSET $2`;
    const val = [limit, offset, id_user];
    db.query(q, val, (err, res)=>{
        cb(err, res);
    });
};

exports.getUserId = (id, cb) => {
    const q = 'SELECT u.id_user, p.picture, p.fullname, p.phonenumber FROM users u INNER JOIN profiles p on p.id_user = u.id_user WHERE u.id_user = $1';
    const val = [id];
    db.query(q,val, (err,res)=>{
        cb(err,res);
    });
};

exports.countAllUsers = (searchBy, keyword, cb)=> {
    db.query(`SELECT * FROM users u INNER JOIN profiles p ON p.id_user = u.id_user WHERE p.${searchBy} LIKE '%${keyword}%'` , (err, res)=>{
        console.log(res);
        if(err){
            console.log(err);
        }
        cb(err, res.rowCount);

    });
};

exports.getTransaction = (id_user, keyword, sortType, limit, offset, cb) =>{
    const q = `SELECT t.id_transaction, t.sander_id, t.recipient_id, t.time_transaction, t.amount, t.notes, 
    p1.fullname recipient_fullname, p2.fullname sender_fullname, p1.phonenumber recipient_phonenumber, p2.phonenumber sender_phonenumber, p1.picture recipient_picture, p2.picture sender_picture, tr1.name FROM transaction t 
    INNER JOIN profiles p1 on p1.id_user = t.recipient_id 
    INNER JOIN profiles p2 on p2.id_user = t.sander_id 
    INNER JOIN type_transaction tr1 on tr1.tpye_id = t.type_id
    WHERE t.sander_id = $1 OR p1.fullname 
    LIKE '%${keyword}%' ORDER BY t.id_transaction ${sortType} LIMIT $2 OFFSET $3`;
    const val = [id_user, limit, offset];
    db.query(q, val, (err, res)=>{
        cb(err, res.rows);
    });
};
exports.getAllTransaction = (id_user ,cb) =>{
    const q ='SELECT id_transaction, sander_id , recipient_id , time_transaction , fullname, phonenumber, picture , amount FROM transaction t INNER JOIN profiles p on p.id_user = t.recipient_id WHERE sander_id = $1';
    const val = [id_user];
    db.query(q, val, (err , res) =>{
        cb(err, res);
    });
};

exports.countTransaction = (id_user, cb) => {
    db.query(`SELECT * FROM transaction WHERE sander_id = ${id_user} OR recipient_id = ${id_user}`, (err, res)=>{
        cb(err, res.rowCount);
    });
};

//start updateuser
exports.editProfiles = (id_user, picture, data, cb)=>{
    let val = [id_user];

    const filtered = {};
    const obj = {
        picture,
        fullname: data.fullname,
        balance: data.balance,
        phonenumber: data.phonenumber,
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
    const q = `UPDATE profiles SET ${finalResult} WHERE id_user=$1 RETURNING *`;
    db.query(q, val, (err,res)=>{
        cb(err, res);
    });
};
//end

// topUp
exports.updateBalance =(id_user,data,cb)=>{
    console.log(typeof data.balance);
    db.query('BEGIN', err => {
        if(err){
            return err;
        }
        const balance = parseInt(data.balance);
        
        const q ='UPDATE profiles SET balance=balance + $1 WHERE id_user=$2 RETURNING *';
        const val = [balance, id_user];
        db.query(q, val, (err,)=>{
            if(err){
                return cb(err);
            }
            const q ='INSERT INTO transaction (time_transaction, notes,  sander_id, recipient_id, amount, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const val = [data.time_transaction, data.notes, data.sander_id=id_user, data.recipient_id=id_user, balance, data.type_id];
            console.log(val);
            db.query(q, val, (err, res)=>{
                if(err){
                    return cb(err);
                }
                cb(err, res);
                db.query('COMMIT', err => {
                    if (err) {
                        console.error('Error committing transaction', err.stack);
                    }
                });
            });
        });
    });
};
// end

//start updateuserPin
exports.editUsersPin = (id_user,data,cb)=>{
    let val = [id_user];

    const filtered = {};
    const obj = {
        password:data.newPassword,
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

    const q = `UPDATE users SET ${finalResult} WHERE id_user=$1 RETURNING *`;
    db.query(q, val, (err,res)=>{
        cb(err, res);
    });
};
//end

exports.transfer = (sander_id, data, cb) => {
    db.query('BEGIN', err => {
        if (err){
            console.log('err1');
        }else{
            const queryText = 'INSERT INTO transaction (time_transaction, recipient_id, sander_id, notes, amount, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const val = [data.time_transaction, data.recipient_id, sander_id, data.notes, data.amount, data.type_id];
            db.query(queryText, val, (err, results) => {
                if (err) {
                    cb(err,results);
                    console.log(err);
                }else{
                    const insertSender = 'UPDATE profiles SET balance = balance - $1 WHERE id_user = $2 RETURNING *';
                    const insertSenderValues = [data.amount, results.rows[0].sander_id];
                    db.query(insertSender, insertSenderValues, (err, res) => {
                        if(err){
                            cb(err,res);
                            console.log(err);
                        }else{
                            const insertRecip = 'UPDATE profiles SET balance = balance + $1 WHERE id_user = $2 RETURNING *';
                            const insertRecipValues = [data.amount, data.recipient_id];
                            db.query(insertRecip, insertRecipValues, (err,res) =>{
                                if (err) {
                                    cb(err,res);
                                    console.log(err);
                                }else{
                                    cb(err,results);
                                    db.query('COMMIT', err => {
                                        if (err) {
                                            console.error('Error committing transaction', err.stack);
                                        }
                                    });
                                }
                            });
                        }
                        
                    });
                }
            });
        }
    });
};