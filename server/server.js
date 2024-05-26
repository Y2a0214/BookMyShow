const express = require('express')
require("./src/db/connection");
const collection_connection = require("./src/modul/schema");
const router = require('./src/routers/movieRouter');
const port = process.env.PORT || 8080;
const cors = require('cors')

const app = express()

//handle cors error
app.use(cors())
//converted data to json 
app.use(express.json())
//use routing for better code readablty
app.use(router)

app.listen(port, () => {
    console.log(`server is runing on port ${port}`)
})
