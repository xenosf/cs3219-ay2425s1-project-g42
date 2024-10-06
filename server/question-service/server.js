const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const Seed = require("./seedQuestions");
const questionsRoutes = require("./routes/questionRoute");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const port = process.env.PORT || 3002;

mongoose
    .connect(process.env.DB_CLOUD_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Node API app is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });


if (process.env.DB_CLOUD_URI) {
    Seed.seedQuestions();
}

//routes
app.use("/questions", questionsRoutes);
