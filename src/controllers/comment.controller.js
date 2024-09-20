const { CommentService } = require('../services/index');
const { CommentRepository } = require('../repositories/index');
const StatusCodes = require('http-status-codes');

const commentService = new CommentService(new CommentRepository());

function pingAnswerController(req, res) {
    return res.json({ message: "pong answer controller" });
}

async function addCommentToComment(req, res, next) {
    try {
        const comment = await commentService.addCommentToComment(req.params.id, req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Comment added to Comment Successfully',
            error: {},
            data: comment
        });
    } catch (error) {
        next(error);
    }
}

async function getAllCommentsToComments(req, res, next) {
    try {
        const comment = await commentService.getAllCommentsToComments(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "All Comments Fetched",
            error: {},
            data: comment
        });
    } catch (error) {
        next(error);
    }
}

async function updateComment(req, res, next) {
    try {
        const updatedComment = await commentService.updateComment(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Comment Updated",
            error: {},
            data: updatedComment
        });
    } catch (error) {
        next(error);
    }
}

async function deleteComment(req, res, next) {
    try {
        const deleteComment = await commentService.deleteComment(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Comment Deleted",
            error: {},
            data: deleteComment
        });
    } catch (error) {
        next(error);
    }
}

async function deleteCommentOfComment(req, res, next) {
    try {
        const deleteComment = await commentService.deleteCommentOfComment(req.params.parent_id, req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Comment of the Comment Deleted",
            error: {},
            data: deleteComment
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    pingAnswerController,
    addCommentToComment,
    getAllCommentsToComments,
    updateComment,
    deleteComment,
    deleteCommentOfComment
};
