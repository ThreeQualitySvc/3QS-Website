const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    year: Number,
    month: Number,
    day: Number,
    date: String,
    hour: Number,
    minute: Number,
    locale: String,
    uniqueID: String
})

const Data = new mongoose.model("Data", dataSchema);
module.exports = Data;