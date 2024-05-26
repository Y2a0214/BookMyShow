const express = require("express")
const router = express.Router()
const collection_connection = require("../modul/schema");


router.post('/booking' ,async (req, res) => {
    try{
        const moviesRecord = collection_connection(req.body)
        const insertMovie = await moviesRecord.save()
        res.status(201).send(insertMovie)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/booking' ,async (req, res) => {
    try{
        const [data] = await collection_connection.find().sort({_id:-1}).limit(1)
        
        if(data.length == 0){
            res.status(200).json({
                message:"No previous Booking found!",
                status:200,
                data:null
            })
        }else{
            res.status(200).json({
                message:"last booking!",
                status:200,
                data:data
            })
        }
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router