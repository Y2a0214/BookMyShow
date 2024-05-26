const express = require('express')
require("./src/db/connection");
const collection_connection = require("./src/modul/schema");
const router = require('./src/routers/movieRouter');
const port = process.env.PORT || 8080;
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`server is runing on port ${port}`)
})
