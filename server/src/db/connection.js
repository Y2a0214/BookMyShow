const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.API_KEY;

// connected to atlas
mongoose.connect(apiKey, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => { console.log("connection established with mongodb server online"); })
.catch(err => {
    console.log("error while connection", err)
});