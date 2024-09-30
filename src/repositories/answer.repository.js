const { Answer } = require('../models/index');
const { Comment } = require('../models/index');
const NotFound = require('../errors/notfound.error');
const logger = require("../config/loger.config"); // CommonJS require
const mongoose = require('mongoose'); 

class AnswerRepository {
    async getAllAnswers(id) {
        try {
            const answers = await Answer.find({ question_id: id });
            logger.info(`Retrieved all answers`);
            return answers;
        } catch (error) {
            logger.error('Error retrieving all answers:', error);
            throw error;
        }
    }

    async updateAnswer(id, updatedData) {
        try {
            const updatedAnswer = await Answer.findByIdAndUpdate(id, { $set: updatedData }, {
                new: true,
                runValidators: true
            });
            if (!updatedAnswer) {
                logger.warn(`Answer with ID: ${id} not found for update`);
                throw new NotFound('Answer', id);
            }
            logger.info(`Answer with ID: ${id} updated`);
            return updatedAnswer;
        } catch (error) {
            logger.error(`Error updating answer with ID: ${id}:`, error);
            throw error;
        }
    }

    async deleteAnswer(id) {
        try {
            const deleteAnswer = await Answer.findByIdAndDelete(id);
            if (!deleteAnswer) {
                logger.warn(`Answer with ID: ${id} not found for deletion`);
                throw new NotFound('Answer', id);
            }
            logger.info(`Answer with ID: ${id} deleted`);
            return deleteAnswer;
        } catch (error) {
            logger.error(`Error deleting answer with ID: ${id}: `, error);
            throw error;
        }
    }
    async addComment(id, commentData) {
        try {
            const answer = await Answer.findById(id);
            if (!answer) {
                logger.warn(`Answer with ID: ${id} not found for adding comment`);
                throw new NotFound('Answer', id);
            }
            console.log(answer);
            const comment = await Comment.create({
                parent_id: id,
                text: commentData.text,
                user_id: commentData.user_id,
                createdAt: new Date(),
            });
            logger.info(`Comment created with ID: ${comment._id}`);
            return comment;
        } catch (error) {
            logger.error(`Error creating comment:`, error);
            throw error;
        }
    }
    
};

module.exports = AnswerRepository;
