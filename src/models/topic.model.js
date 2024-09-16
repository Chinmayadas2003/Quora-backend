const mongoose = require('mongoose');

// Define the schema for topics
const topicSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'id of topic cannot be empty']
    },
    name: {
        type: String,
        required: [true, 'name of the topic cannot be empty']
    }
});

// Create the Topic model
const Topic = mongoose.model('topics', topicSchema);

module.exports = Topic;
