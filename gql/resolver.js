const userController = require('../controllers/user.controller');
const followController = require('../controllers/follow.controller');
const { GraphQLUpload } = require("graphql-upload");
const publicationController = require('../controllers/publication.controller');
const commentController = require('../controllers/comment.controller');

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        //user
        getUser: (_, { id, username }) => userController.getUser(id, username),
        search: (_, { search }) => userController.search(search),

        //follow
        isFollow: (_, { username }, ctx) => followController.isFollow(username, ctx),
        getFollowers: (_, { username }) => followController.getFollowers(username),
        getFollows: (_, { username }) => followController.getFollows(username),

        //publication
        getAllPublications: (_, { username }) => publicationController.getAllPublications(username),
    }, 
 
    Mutation: {
        //user
        register: (_, { input }) => userController.register(input), 
        login: (_, { input }) => userController.login(input),
        updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
        deleteAvatar: (_, {}, ctx) => userController.deleteAvatar(ctx),
        updateUser: (_, { input }, ctx) => userController.updateUser(input, ctx),

        //follow
        follow: (_, { username }, ctx) => followController.follow(username, ctx),
        unFollow: (_, { username }, ctx) => followController.unFollow(username, ctx),

        //publication
        publish: (_, { file }, ctx) => publicationController.publish(file, ctx),

        //comment
        addComment: (_, { input }, ctx) => commentController.addComment(input, ctx)
    }
};

module.exports = resolvers;