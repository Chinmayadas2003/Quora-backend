const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    parent_id: {
        type: String,
        required: [false, 'Parent ID of the comment cannot be empty']
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
    timestamps: true  // Automatically adds 'createdAt' and 'updatedAt'
});

const Comment = model('Comment', commentSchema);
module.exports = Comment;
