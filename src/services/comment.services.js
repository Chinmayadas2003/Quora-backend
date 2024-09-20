class CommentService {
    constructor(CommentRepository) {
        this.CommentRepository = CommentRepository;
    }

    async addCommentToComment(commentId, CommentData) {
        const comment = await this.CommentRepository.addCommentToComment(commentId, CommentData);
        return comment;
    }

    async getAllCommentsToComments(commentId) {
        const comments = await this.CommentRepository.getAllCommentsToComments(commentId);
        return comments;
    }

    async updateComment(commentId, updatedData) {
        const comment = await this.CommentRepository.updateComment(commentId, updatedData);
        return comment;
    }

    async deleteComment(commentId) {
        const comment = await this.CommentRepository.deleteComment(commentId);
        return comment;
    }

    async deleteCommentOfComment(parent_id, commentId) {
        const comment = await this.CommentRepository.deleteCommentOfComment(parent_id, commentId);
        return comment;
    }
}

module.exports = CommentService;
