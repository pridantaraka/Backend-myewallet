const express = require('express')

const app = express()

app.use(express,urlencoded({extends: false}))

app.get('/')