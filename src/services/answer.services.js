class AnswerService {
    constructor(AnswerRepository) {
        this.AnswerRepository = AnswerRepository;
    }

    async getAllAnswers(questionId) {
        const answers = await this.AnswerRepository.getAllAnswers(questionId);
        return answers;
    }

    async updateAnswer(answerId, updatedData) {
        const answer = await this.AnswerRepository.updateAnswer(answerId, updatedData);
        return answer;
    }

    async deleteAnswer(answerId) {
        const answer = await this.AnswerRepository.deleteAnswer(answerId);
        return answer;
    }

    async addComment(id,commentData){
        const comment= await this.AnswerRepository.addComment(id,commentData);
        return comment;
    }
}

module.exports = AnswerService;
