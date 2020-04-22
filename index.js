const express = require('express')
const setupDB = require('./config/database')
const cors = require('cors')
const router = require('./config/routes')
const port = 3033
const app = express()
setupDB()

app.use(express.json())//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(cors())
app.use('/',router)

app.listen(port,()=>{
    console.log("Listetning to port",port)
})