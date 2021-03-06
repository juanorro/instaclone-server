const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID
        name: String
        username: String
        email: String
        avatar: String
        siteWeb: String
        description: String
        password: String
        createAt: String
    }

    type Token {
        token: String
    }

    scalar Upload

    type UpdateAvatar {
        status: Boolean
        urlAvatar: String
    }

    type Publish {
        status: Boolean
        urlFile: String
    }

    type Publication {
        id: ID
        idUser: ID
        file: String
        typeFile: String
        createAt: String
    }

    type Comment {
        idPublication: ID
        idUser: User
        comment: String
        createAt: String
    }

    type FeedPublication {
        id: ID
        idUser: User
        file: String
        typeFile: String
        createAt: String
    }

    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name: String
        email: String
        currentPassword: String
        newPassword: String
        siteWeb: String
        description: String
    }

    input CommentInput {
        idPublication: ID
        comment: String
    }

    type Query {
        # user
        getUser(id: ID, username: String): User
        search(search: String): [User]

        #follow
        isFollow(username: String!): Boolean
        getFollowers(username: String!): [User]
        getFollows(username: String!): [User]
        getNotFollowers: [User]

        #publication
        getAllPublications(username: String!): [Publication]
        getPublicationsFollowers: [FeedPublication]

        #comment
        getComments(idPublication: ID!): [Comment]

        #like
        isLike(idPublication: ID!): Boolean
        countLikes(idPublication: ID!): Int

    }

    type Mutation {
        #user
        register(input: UserInput): User
        login(input: LoginInput): Token
        updateAvatar(file: Upload): UpdateAvatar
        deleteAvatar: Boolean
        updateUser(input: UserUpdateInput): Boolean

        #follow
        follow(username: String!): Boolean
        unFollow(username: String!): Boolean

        #publication
        publish(file: Upload): Publish

        #comment
        addComment(input: CommentInput): Comment

        #like
        addLike(idPublication: ID!): Boolean
        deleteLike(idPublication: ID!): Boolean
    }
`;

module.exports = typeDefs;