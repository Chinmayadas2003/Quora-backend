const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const likeSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'The userId of Like cannot be empty']
    },
    type: {
        type: String,
        enum: ["questions", "answers", "comments"],
        required: [true, 'The type of Like cannot be empty'],
    },
    type_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'The type_id cannot be empty']
    }
});

const Like = model("likes", likeSchema);
module.exports = Like;
