const { Question } = require('../models/index');
const { Answer } = require('../models/index');
const NotFound = require('../errors/notfound.error');
const logger = require("../config/loger.config"); // Use require for CommonJS modules

class QuestionRepository {
    async createQuestion(questionData) {
        try {
            const question = await Question.create({
                title: questionData.title,
                body: questionData.body,
                topics: questionData.topics,
                user_id: questionData.user_id,
            });
            logger.info(`Question created with ID: ${question._id}`);
            return question;
        } catch (error) {
            logger.error('Error creating Question: ', error);
            throw error;
        }
    }
    
    async searchQuestion(searchData) {
        try {
            const query = {};  // Initialize an empty query object
    
            // Build a dynamic query using regex for case-insensitive matching
            for (const [key, value] of Object.entries(searchData)) {
                if (value) { // Ensure that the value is not undefined or null
                    query[key] = { $regex: value, $options: 'i' };
                }
            }
    
            // Perform the search in the database
            const questions = await Question.find(query);
    
            // Check if no results are found
            if (!questions.length) {
                logger.warn(`Questions matching search data: ${JSON.stringify(searchData)} not found`);
                throw new NotFound('Question', searchData);
            }
    
            // Log and return the found questions
            logger.info(`Questions matching search data: ${JSON.stringify(searchData)} retrieved`);
            return questions;
    
        } catch (error) {
            logger.error(`Error retrieving questions with search data: ${JSON.stringify(searchData)}: `, error);
            throw error;
        }
    }
    
    async getAllQuestions() {
        try {
            const questions = await Question.find({});
            logger.info(`Retrieved all questions`);
            return questions;
        } catch (error) {
            logger.error('Error retrieving all questions: ', error);
            throw error;
        }
    }

    async updateQuestion(id, updatedData) {
        try {
            const updatedQuestion = await Question.findByIdAndUpdate(id, { $set: updatedData }, {
                new: true,
                runValidators: true
            });
            if (!updatedQuestion) {
                logger.warn(`Question with ID: ${id} not found for update`);
                throw new NotFound('Question', id);
            }
            logger.info(`Question with ID: ${id} updated`);
            return updatedQuestion;
        } catch (error) {
            logger.error(`Error updating question with ID: ${id}: `, error);
            throw error;
        }
    }

    async deleteQuestion(id) {
        try {
            const deleteQuestion = await Question.findByIdAndDelete(id);
            if (!deleteQuestion) {
                logger.warn(`Question with ID: ${id} not found for deletion`);
                throw new NotFound('Question', id);
            }
            logger.info(`Question with ID: ${id} deleted`);
            return deleteQuestion;
        } catch (error) {
            logger.error(`Error deleting question with ID: ${id}: `, error);
            throw error;
        }
    }

    async addAnswer(id, answerData) {
        try {
            const question = await Question.findById(id);
            if (!question) {
                logger.warn(`Question with ID: ${id} not found for adding answer`);
                throw new NotFound('Question', id);
            }
            console.log(question);
            console.log(answerData);
            const answer = await Answer.create({
                question_id: id,
                text: answerData.text,
                user_id: answerData.user_id,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            logger.info(`Answer created with ID: ${answer._id}`);
            return answer;
        } catch (error) {
            logger.error(`Error creating answer:`, error);
            throw error;
        }
    }

};

module.exports = QuestionRepository; // Use module.exports for CommonJS

