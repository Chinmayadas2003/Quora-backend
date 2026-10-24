const mongoose = require('mongoose');
const { MONGO_URI } = require("./server.config");

async function connectToDB() {
    if (!MONGO_URI) {
        throw new Error('Missing required environment variable: MONGO_URI');
    }

    await mongoose.connect(MONGO_URI);
    return mongoose.connection;
}

module.exports = connectToDB;
