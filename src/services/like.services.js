class LikeService {
    constructor(LikeRepository) {
        this.LikeRepository = LikeRepository;
    }

    async like(type, type_id, id) {
        const like = await this.LikeRepository.like(type, type_id, id);
        return like;
    }

    async getLikes(type, type_id, id) {
        const likes = await this.LikeRepository.getLikes(type, type_id, id);
        return likes;
    }

    async dislike(like_id) {
        const dislike = await this.LikeRepository.dislike(like_id);
        return dislike;
    }
}

module.exports = LikeService;
