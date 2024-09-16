const mongoose=require("mongoose");


const questionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id of the question cannot be empty']
    },
    title: {
        type: String,
        required: [true, 'Title of the question cannot be empty']
    },
    body: {
        type: String,
        required: [true, 'Body of the question cannot be empty']
    },
    topics: [
        {
            type: String,
            required: [true, 'Topics of the question cannot be empty']
        }
    ],
    user_id: {
        type: String,
        required: [true, 'User ID of the question cannot be empty']
    }
}, {
    timestamps: { createdAt: 'created_at' }
});

const Question=mongoose.model('question',questionSchema);
module.exports=Question;