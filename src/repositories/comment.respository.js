const { Comment } = require('../models/index');
const NotFound = require('../errors/notfound.error');
const logger = require("../config/loger.config");
const mongoose = require('mongoose'); // Ensure mongoose is imported for transactions

async function deleteNestedComments(commentId, session = null) {
    try {
        const nestedComments = await Comment.find({ parent_id: commentId }).session(session);
        for (const nestedComment of nestedComments) {
            // Recursively delete nested comments
            await deleteNestedComments(nestedComment._id, session);
            // Delete the current nested comment
            const deleted = await Comment.findByIdAndDelete(nestedComment._id).session(session);
            if (deleted) {
                logger.info(`Nested comment with ID: ${nestedComment._id} deleted`);
            } else {
                logger.warn(`Failed to delete nested comment with ID: ${nestedComment._id}`);
            }
        }
    } catch (error) {
        logger.error(`Error deleting nested comments for Comment ID: ${commentId}`, error);
        throw error;
    }
}

class CommentRepository {
    async addCommentToComment(commentId, commentData) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            // Verify that the parent comment exists
            const parentComment = await Comment.findById(commentId).session(session);
            if (!parentComment) {
                logger.warn(`Parent comment with ID: ${commentId} not found`);
                throw new NotFound('Comment', commentId);
            }

            const comment = await Comment.create([{
                parent_id: commentId,
                text: commentData.text,
                user_id: commentData.user_id
            }], { session });

            logger.info(`Comment created with ID: ${comment[0]._id}`);
            await session.commitTransaction();
            session.endSession();
            return comment[0];
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            logger.error('Error creating Comment: ', error);
            throw error;
        }
    }

    async getAllCommentsToComments(commentId) {
        try {
            const comments = await Comment.find({ parent_id: commentId });
            logger.info(`Retrieved ${comments.length} nested comments for Comment ID: ${commentId}`);
            return comments;
        } catch (error) {
            logger.error('Error retrieving nested comments: ', error);
            throw error;
        }
    }

    async updateComment(commentId, updatedData) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                { $set: updatedData },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            );
            if (!updatedComment) {
                logger.warn(`Comment with ID: ${commentId} not found for update`);
                throw new NotFound('Comment', commentId);
            }
            logger.info(`Comment with ID: ${commentId} updated`);
            await session.commitTransaction();
            session.endSession();
            return updatedComment;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            logger.error(`Error updating comment with ID: ${commentId}:`, error);
            throw error;
        }
    }

    async deleteComment(commentId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const commentToDelete = await Comment.findById(commentId).session(session);
            if (!commentToDelete) {
                logger.warn(`Comment with ID: ${commentId} not found for deletion`);
                throw new NotFound('Comment', commentId);
            }

            // Delete all nested comments
            await deleteNestedComments(commentId, session);

            // Delete the main comment
            const deletedComment = await Comment.findByIdAndDelete(commentId).session(session);
            if (deletedComment) {
                logger.info(`Comment with ID: ${commentId} deleted`);
            } else {
                logger.warn(`Failed to delete comment with ID: ${commentId}`);
                throw new Error(`Failed to delete comment with ID: ${commentId}`);
            }

            await session.commitTransaction();
            session.endSession();
            return deletedComment;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            logger.error(`Error deleting comment with ID: ${commentId}:`, error);
            throw error;
        }
    }

    async deleteNestedComment(parentId, commentId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            // Find the comment and verify its parent_id
            const commentToDelete = await Comment.findOne({ _id: commentId, parent_id: parentId }).session(session);
            if (!commentToDelete) {
                logger.warn(`Comment with ID: ${commentId} not found or does not belong to parent ID: ${parentId}`);
                throw new NotFound('Comment', commentId);
            }

            // Delete all nested comments under this comment
            await deleteNestedComments(commentId, session);

            // Delete the comment itself
            const deletedComment = await Comment.findByIdAndDelete(commentId).session(session);
            if (deletedComment) {
                logger.info(`Comment with ID: ${commentId} deleted`);
            } else {
                logger.warn(`Failed to delete comment with ID: ${commentId}`);
                throw new Error(`Failed to delete comment with ID: ${commentId}`);
            }

            await session.commitTransaction();
            session.endSession();
            return deletedComment;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            logger.error(`Error deleting comment with ID: ${commentId}:`, error);
            throw error;
        }
    }
}

module.exports = CommentRepository;
