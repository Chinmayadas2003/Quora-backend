class UserService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }

    async createUser(userData) {
        const user = await this.UserRepository.createUser(userData);
        return user;
    }

    async getUser(userId) {
        const user = await this.UserRepository.getUser(userId);
        return user;
    }

    async getAllUsers() {
        const users = await this.UserRepository.getAllUsers();
        return users;
    }

    async updateUser(userId, updatedData) {
        const user = await this.UserRepository.updateUser(userId, updatedData);
        return user;
    }

    async deleteUser(userId) {
        const user = await this.UserRepository.deleteUser(userId);
        return user;
    }
}

module.exports = UserService;
