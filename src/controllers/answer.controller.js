const { AnswerService } = require('../services/index');
const { AnswerRepository } = require('../repositories/index');
const StatusCodes = require('http-status-codes');

// Instantiate the answer service with the repository
const answerService = new AnswerService(new AnswerRepository());

// Controller function to ping the answer controller
function pingAnswerController(req, res) {
    return res.json({ message: "pong answer controller" });
}

// Controller function to get all answers
async function getAllAnswers(req, res, next) {
    try {
        const answers = await answerService.getAllAnswers(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "All Answers Fetched",
            error: {},
            data: answers
        });
    } catch (error) {
        next(error);
    }
}

// Controller function to update an answer
async function updateAnswer(req, res, next) {
    try {
        const updatedAnswer = await answerService.updateAnswer(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Answer Updated",
            error: {},
            data: updatedAnswer
        });
    } catch (error) {
        next(error);
    }
}

// Controller function to delete an answer
async function deleteAnswer(req, res, next) {
    try {
        const deleteAnswer = await answerService.deleteAnswer(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Answer Deleted",
            error: {},
            data: deleteAnswer
        });
    } catch (error) {
        next(error);
    }
}

// Controller function to add a comment to an answer
async function addComment(req, res, next) {
    try {
        const comment = await answerService.addComment(req.params.id, req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Comment Created Successfully',
            error: {},
            data: comment
        });
    } catch (error) {
        next(error);
    }
}

// Exporting the controller functions
module.exports = {
    pingAnswerController,
    getAllAnswers,
    updateAnswer,
    deleteAnswer,
    addComment
};
