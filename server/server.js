const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { seedQuestions } = require("./seedQuestions");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/questions", questionsRoutes)

mongoose
    .connect(process.env.DB_CLOUD_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(8000, () => {
            console.log("Node API app is running on port 8000");
        });
    })
    .catch((error) => {
        console.log(error);
    });

if (process.env.DB_CLOUD_URI) {
    seedQuestions();
}
