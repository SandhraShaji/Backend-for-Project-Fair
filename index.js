//loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./DB/connection')
const router = require('./Routes/router')
const appMiddleware =  require('./Middlewares/appMiddleware')
const pfserver = express()
pfserver.use(cors())
pfserver.use(express.json())
pfserver.use(appMiddleware)
pfserver.use(router)
pfserver.use('/uploads', express.static('./uploads')) //image exporting to frontend

const PORT = 4000 || process.env.PORT
pfserver.listen(PORT, ()=>{
    console.log('pfserver listening on port ' +PORT);
})
pfserver.get('/', (req,res)=>{
    res.send(`<h1>Project fair server started</h1>`)
})