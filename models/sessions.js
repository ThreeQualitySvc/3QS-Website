const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    sessionID: String,
    visitedAt: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String
    },
    ipAddress: {
        type: String
    }
})

const Session = new mongoose.model("SessionID", sessionSchema);
module.exports = Session;