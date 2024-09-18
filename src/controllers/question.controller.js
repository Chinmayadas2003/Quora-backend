const { QuestionService } = require('../services/index');
const { QuestionRepository } = require('../repositories/index');
const StatusCodes = require('http-status-codes');

const questionService = new QuestionService(new QuestionRepository());

function pingQuestionController(req, res) {
    return res.json({ message: "pong question controller" });
}

async function createQuestion(req, res, next) {
    try {
        const newQuestion = await questionService.createQuestion(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'New Question Created Successfully',
            error: {},
            data: newQuestion
        });
    } catch (error) {
        next(error);
    }
}

async function searchQuestion(req, res, next) {
    try {
        const question = await questionService.searchQuestion(req.body);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Question Fetched",
            error: {},
            data: question
        });
    } catch (error) {
        next(error);
    }
}

async function getAllQuestions(req, res, next) {
    try {
        const questions = await questionService.getAllQuestions();
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "All Questions Fetched",
            error: {},
            data: questions
        });
    } catch (error) {
        next(error);
    }
}

async function updateQuestion(req, res, next) {
    try {
        const updatedQuestion = await questionService.updateQuestion(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Question Updated",
            error: {},
            data: updatedQuestion
        });
    } catch (error) {
        next(error);
    }
}

async function deleteQuestion(req, res, next) {
    try {
        const deleteQuestion = await questionService.deleteQuestion(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Question Deleted",
            error: {},
            data: deleteQuestion
        });
    } catch (error) {
        next(error);
    }
}

async function addAnswer(req, res, next) {
    try {
        const addedAnswer = await questionService.addAnswer(req.params.id, req.body);
        return res.status(StatusCodes.CREATED).json({
            success: "true",
            message: "Answer Added",
            error: {},
            data: addedAnswer
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    pingQuestionController,
    createQuestion,
    searchQuestion,
    getAllQuestions,
    updateQuestion,
    deleteQuestion,
    addAnswer
};
