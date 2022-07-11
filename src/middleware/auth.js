const jwt = require('jsonwebtoken');
const response = require('../helpers/standartResponse');

const auth = (req, res, next)=>{
    if (req.headers.authorization) {
        const auth = req.headers.authorization;
        const prefix = 'Bearrer';
        if (auth.startsWith(prefix)) {
            const token = auth.slice(prefix.length+1, auth.length);
            try{const results = jwt.verify(token, process.env.APP_SECRET || 'secretKey');
                console.log(token);
                req.authUser = results;
                next();
            }catch(e){
                return response(res, 'Token Expired', null, null, 401);
            }
        }
    }else{
        return response(res, 'Unauthorized', null, null, 401);
    }
    
};

module.exports = auth;