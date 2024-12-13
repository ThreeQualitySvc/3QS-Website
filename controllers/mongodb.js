require("dotenv").config();
const session = require("express-session");
const mongoose = require('mongoose');

const localConnection = "mongodb://127.0.0.1:27017/StuffDB"

mongoose.set('strictQuery', true);

(async () => {
    try {

        await mongoose.connect(localConnection);
        console.log('Connected to local MongoDB instance');
    } catch (error) {
        console.error('Error connecting to local instance');
    }
})();

module.exports = mongoose;