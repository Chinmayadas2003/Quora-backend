class QuestionService {
    constructor(QuestionRepository) {
        this.QuestionRepository = QuestionRepository;
    }

    async createQuestion(questionData) {
        const question = await this.QuestionRepository.createQuestion(questionData);
        return question;
    }

    async searchQuestion(searchData) {
        const question = await this.QuestionRepository.searchQuestion(searchData);
        return question;
    }

    async getAllQuestions() {
        const questions = await this.QuestionRepository.getAllQuestions();
        return questions;
    }

    async updateQuestion(questionId, updatedData) {
        const question = await this.QuestionRepository.updateQuestion(questionId, updatedData);
        return question;
    }

    async deleteQuestion(questionId) {
        const question = await this.QuestionRepository.deleteQuestion(questionId);
        return question;
    }
    async addAnswer(questionId, answerData) {
        const answer = await this.QuestionRepository.addAnswer(questionId, answerData);
        return answer;
    }
}

module.exports = QuestionService;  // Export the service class using CommonJS
