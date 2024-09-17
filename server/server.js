const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config()
app.use(cors());
app.use(express.json());
//routes

app.get('/messages', (req,res) => {
    res.json({message: 'I love CS3219 Group 42'})
})

mongoose.
connect(process.env.DB_CLOUD_URI)
.then(() => {
    
    console.log("Connected to MongoDB")
    app.listen(8000, () => {
        console.log('Node API app is running on port 8000')
    })
}).catch((error) => {
    console.log(error)
})