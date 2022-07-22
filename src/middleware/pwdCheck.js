const pwdStatus = (req, res, next)=>{
    req.body.plainPassword=req.body.newPassword;
    next();
};

module.exports = pwdStatus;