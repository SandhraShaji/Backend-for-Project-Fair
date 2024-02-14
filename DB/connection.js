//node + mongodb connection
const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log('MongoDB connection established');
})
.catch(err=>{
    console.log('MongoDB connection error'+err.message);
})