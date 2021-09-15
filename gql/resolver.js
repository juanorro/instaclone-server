const userController = require('../controllers/user.controller');

const resolvers = {
    Query: {
        getUser: (_, { id, username }) => userController.getUser(id, username)
    }, 
 
    Mutation: {
        //user
        register: (_, { input }) => userController.register(input), 
        login: (_, { input }) => userController.login(input),
        updateAvatar: (_, { file }) => userController.updateAvatar(file),
    }
};

module.exports = resolvers;