const { User } = require('../models/index');
const NotFound = require('../errors/notfound.error');
const logger = require('../config/loger.config'); // CommonJS syntax for importing logger

class UserRepository {
    async createUser(userData) {
        try {
            const user = await User.create({
                id:userData.id,
                username: userData.username,
                email: userData.email,
                bio: userData.bio || ""
            });
            logger.info(`User created with ID: ${user._id}`);
            return user;
        } catch (error) {
            logger.error('Error creating User: ', error);
            throw error;
        }
    }

    async getUser(id) {
        try {
            const user = await User.findById(id);
            if (!user) {
                logger.warn(`User with ID: ${id} not found`);
                throw new NotFound('User', id);
            }
            logger.info(`User with ID: ${id} retrieved`);
            return user;
        } catch (error) {
            logger.error(`Error retrieving user with ID: ${id}: `, error);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await User.find({});
            logger.info(`Retrieved all users`);
            return users;
        } catch (error) {
            logger.error('Error retrieving all users: ', error);
            throw error;
        }
    }

    async updateUser(id, updatedData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, { $set: updatedData }, {
                new: true,
                runValidators: true
            });
            if (!updatedUser) {
                logger.warn(`User with ID: ${id} not found for update`);
                throw new NotFound('User', id);
            }
            logger.info(`User with ID: ${id} updated`);
            return updatedUser;
        } catch (error) {
            logger.error(`Error updating user with ID: ${id}: `, error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const deleteUser = await User.findByIdAndDelete(id);
            if (!deleteUser) {
                logger.warn(`User with ID: ${id} not found for deletion`);
                throw new NotFound('User', id);
            }
            logger.info(`User with ID: ${id} deleted`);
            return deleteUser;
        } catch (error) {
            logger.error(`Error deleting user with ID: ${id}: `, error);
            throw error;
        }
    }
    //deleting based on user defined id
    // async deleteUser(id) {
    //     try {
    //         const deleteUser = await User.findOneAndDelete({id:id});
    //         if (!deleteUser) {
    //             logger.warn(`User with ID: ${id} not found for deletion`);
    //             throw new NotFound('User', id);
    //         }
    //         logger.info(`User with ID: ${id} deleted`);
    //         return deleteUser;
    //     } catch (error) {
    //         logger.error(`Error deleting user with ID: ${id}: `, error);
    //         throw error;
    //     }
    // }
}

module.exports = UserRepository;

