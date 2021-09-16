const { gql } = require('apollo-server');

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

    type Query {
        # user
        getUser(id: ID, username: String): User
        search(search: String): [User]

        #follow
        isFollow(username: String!): Boolean
        getFollowers(username: String!): [User]
        getFollows(username: String!): [User]
    }

    type Mutation {
        #user
        register(input: UserInput): User
        login(input: LoginInput): Token
        updateAvatar(file: Upload!): UpdateAvatar
        updateUser(input: UserUpdateInput): Boolean

        #follow
        follow(username: String!): Boolean
        unFollow(username: String!): Boolean
    }
`;

module.exports = typeDefs;