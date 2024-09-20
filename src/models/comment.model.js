const mongoose = require('mongoose');

// Define the schema for comments
const commentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id of the comment cannot be empty']
    },
    parent_id: {
        type: String,
        required: [true, 'Parent ID of the comment cannot be empty']
    },
    text: {
        type: String,
        required: [true, 'Text of the comment cannot be empty']
    },
    user_id: {
        type: String,
        required: [true, 'User ID of the comment cannot be empty']
    }
}, {
    timestamps: true // Adds created_at and updated_at timestamps automatically
});

// Create the Comment model
const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;
