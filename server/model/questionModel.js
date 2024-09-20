const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: String, required: true },
    complexity: { type: String, required: true },
    link: { type: String, required: true },
});

export default mongoose.model("Question", questionSchema)