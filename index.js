require('dotenv').config();

const cors = require('cors');
const express = require('express');
// const authMw = require('./src/middleware/auth');
app.use(cors());

global.__basepath = __dirname;

const app = express();

app.use(express.urlencoded({extends: false}));
app.use('/public', express.static('assets'));

app.get('/',(req, res)=>{
    return res.json({
        success: true,
        message: 'is running well'
    });
});


 
app.get('/', function (req, res) {
    res.json({msg: 'This is CORS-enabled for all origins!'});
});
 
app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80');
});
// app.get('/authUser', authMw, (req, res) => {
//     const userModels = require('./src/models/users');
//     userModels.getUserbyId(req.authUser.id, (err, results)=>{
//         console.log(req.authUser.id);
//         const user = results.rows[0];
//         return res.json({
//             massage:'Hello ' +user.email
//         });
//     }); 
// });

app.use('/',require('./src/routes'));

app.use('*', (req,res)=>{
    return res.status(404).send({
        success: false,
        message: 'resource not found'
    });
});

app.listen(3333, ()=>{
    console.log('app is running on port 3333');
});