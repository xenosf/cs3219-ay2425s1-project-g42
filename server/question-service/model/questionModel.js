const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: String, required: true },
    complexity: { type: String, required: true },
    link: { type: String, required: true },
});

const Product = mongoose.model("Question", questionSchema)
module.exports = Product;