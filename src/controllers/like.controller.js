const { LikeService } = require('../services/index');
const { LikeRepository } = require('../repositories/index');
const StatusCodes = require('http-status-codes');

const likeService = new LikeService(new LikeRepository());

function pingLikeController(req, res) {
    return res.json({ message: "pong like controller" });
}

async function like(req, res, next) {
    try {
        const like = await likeService.like(req.params.type, req.params.type_id, req.params.id);
        return res.status(StatusCodes.CREATED).json({
            success: "true",
            message: `Liked the ${req.params.id}`,
            error: {},
            data: like
        });
    } catch (error) {
        next(error);
    }
}

async function getLikes(req, res, next) {
    try {
        const likes = await likeService.getLikes(req.params.type, req.params.type_id, req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: `Retrieved Likes of user id ${req.params.id}`,
            error: {},
            data: likes
        });
    } catch (error) {
        next(error);
    }
}

async function dislike(req, res, next) {
    try {
        const dislike = await likeService.dislike(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: `Disliked the ${req.params.id}`,
            error: {},
            data: dislike
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    pingLikeController,
    like,
    getLikes,
    dislike
};
