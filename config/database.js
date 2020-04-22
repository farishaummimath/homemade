const mongoose = require('mongoose')

const setupDB= ()=> mongoose.connect("mongodb://localhost:27017/home-made-app",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex : true, useFindAndModify : false})
    .then(()=>{
        console.log('Successfully connected to DB')
    })
    .catch(()=>{
        console.log('Error connecting to DB')
    })
module.exports = setupDB