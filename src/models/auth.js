const db = require('../helpers/db');

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
                    const insertPhotoText = 'INSERT INTO profiles(id_user) VALUES($1)';
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

//start updateuser
exports.editProfiles = (id_profile, picture, data, cb)=>{
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