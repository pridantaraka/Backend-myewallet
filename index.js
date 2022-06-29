require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.urlencoded({extends: false}));

app.get('/',(req, res)=>{
    return res.json({
        success: true,
        message: 'is running well'
    });
});

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