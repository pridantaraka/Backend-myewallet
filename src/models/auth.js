const db = require('../helpers/db');
// const {LIMIT_DATA} = process.env;

exports.register = (data, cb) => {
    db.query('BEGIN', err => {
        if (err){
            console.log('err1');
        }else{
            const queryText = 'INSERT INTO users(email, password, username) VALUES($1, $2, $3) RETURNING id_user';
            db.query(queryText, [data.email, data.password, data.username], (err, res) => {
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
                                    console.error('Error committing transaction', err.stack);
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
    const q = 'SELECT * FROM profiles WHERE id_user=$1';
    const val = [id_user];
    db.query(q, val,  (err, res)=>{
        cb(err, res);
    });
};
//end

exports.getTransaction = (id_user, sortType, limit, offset=0, cb) =>{
    db.query(`SELECT * FROM transaction WHERE sander_id = ${id_user} OR recipient_id = ${id_user} ORDER BY id_transaction ${sortType} LIMIT $1 OFFSET $2`, [limit, offset], (err, res)=>{
        console.log(err);
        cb(err, res.rows);
    });
};

exports.countTransaction = (id_user, cb) => {
    db.query(`SELECT * FROM transaction WHERE sander_id = ${id_user} OR recipient_id = ${id_user}`, (err, res)=>{
        console.log(err);
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
            const q ='INSERT INTO transaction (time_transaction, notes, recipient_id, sander_id, amount, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const val = [data.time_transaction, data.notes, data.recipient_id, data.sander_id, balance, data.type_id];
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
            db.query(queryText, val, (err, res) => {
                cb(err,res);
                if (err) {
                    console.log(err);
                }else{
                    const insertSender = 'UPDATE profiles SET balance = balance - $1 WHERE id_user = $2 RETURNING *';
                    const insertSenderValues = [data.amount, res.rows[0].sander_id];
                    db.query(insertSender, insertSenderValues, (err, res) => {
                        if(err){
                            cb(err,res);
                            console.log('err');
                        }else{
                            const insertRecip = 'UPDATE profiles SET balance = balance + $1 WHERE id_user = $2 RETURNING *';
                            const insertRecipValues = [data.amount, res.rows[0].recipient_id];
                            db.query(insertRecip, insertRecipValues, (err,res) =>{
                                if (err) {
                                    cb(err,res);
                                    console.log('err');
                                }else{
                                    cb(err,res);
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