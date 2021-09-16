const userController = require('../controllers/user.controller');
const followController = require('../controllers/follow.controller');

const resolvers = {
    Query: {
        //user
        getUser: (_, { id, username }) => userController.getUser(id, username),
        search: (_, { search }) => userController.search(search),

        //follow
        isFollow: (_, { username }, ctx) => followController.isFollow(username, ctx),
        getFollowers: (_, { username }) => followController.getFollowers(username),
        getFollows: (_, { username }) => followController.getFollows(username),
    }, 
 
    Mutation: {
        //user
        register: (_, { input }) => userController.register(input), 
        login: (_, { input }) => userController.login(input),
        updateAvatar: (_, { file }) => userController.updateAvatar(file),
        updateUser: (_, { input }, ctx) => userController.updateUser(input, ctx),

        //follow
        follow: (_, { username }, ctx) => followController.follow(username, ctx),
        unFollow: (_, { username }, ctx) => followController.unFollow(username, ctx),
    }
};

module.exports = resolvers;