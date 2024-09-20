const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const Seed = require("./seedQuestions");
const Question = require("./model/questionModel");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    Seed.seedQuestions();
}

//routes
//app.use("/questions", questionsRoutes)

// get all questions
app.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find({});
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get by id
app.get("/questions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get easy
app.get("/questions/complexity/easy", async (req, res) => {
    try {
        const question = await Question.find({ complexity: { $eq: "Easy" } });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get medium
app.get("/questions/complexity/medium", async (req, res) => {
    try {
        const question = await Question.find({ complexity: { $eq: "Medium" } });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get hard
app.get("/questions/complexity/hard", async (req, res) => {
    try {
        const question = await Question.find({ complexity: { $eq: "Hard" } });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
