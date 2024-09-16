const mongoose = require('mongoose');

// Define the schema for the Answer model
const answerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id of the answer cannot be empty']
    },
    question_id: {
        type: String,
        required: [true, 'question_id of the answer cannot be empty']
    },
    text: {
        type: String,
        required: [true, 'Text of the answer cannot be empty']
    },
    user_id: {
        type: String,
        required: [true, 'user_id of the answer cannot be empty']
    }
}, {
    timestamps: { createdAt: 'created_at' }
});

// Create the Answer model
const Answer = mongoose.model('answers', answerSchema);

// Export the Answer model
module.exports = Answer;
