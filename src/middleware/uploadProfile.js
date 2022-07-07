const upload = require('../helpers/upload').single('picture');

const response = require('../helpers/standartResponse');


const uploadProfile = (req, res, next) => {
    upload(req, res, function (err) {
        if(err){
            return response(res, `Failed to update: ${err.massage}`, null, null, 400);
        }
        next();
    });
};

module.exports = uploadProfile;