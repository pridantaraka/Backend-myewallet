const express = require('express')

const app = express()

app.use(express.urlencoded({extends: false}))

app.get('/',(req, res)=>{
    return res.json({
        success: true,
        message: 'is running well'
    })
})

app.post('/',(req, res)=>{
    return res.json({
        success: true,
        message: 'posted data success to send'
    })
})

app.listen(3333, ()=>{
    console.log('app is running on port 3333');
})