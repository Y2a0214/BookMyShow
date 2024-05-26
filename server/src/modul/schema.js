const mongoose = require('mongoose');
//puted schema a structure data /
const bookMovieschema = new mongoose.Schema({
    movie: {
        type:String,
        require:true
    },
    slot: {
        type:String,
        require:true        
    },
    seats: {
        A1: {type:Number},
        A2: {type:Number},
        A3: {type:Number},
        A4: {type:Number},
        D1: {type:Number},
        D2: {type:Number}
    }

})

let collection_connection = new mongoose.model('bookmovietickets', bookMovieschema)

module.exports = collection_connection;