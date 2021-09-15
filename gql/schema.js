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

    type Query {
        # user
        getUser(id: ID, username: String): User
    }

    type Mutation {
        #user
        register(input: UserInput): User
        login(input: LoginInput): Token
        updateAvatar(file: Upload!): UpdateAvatar
    }
`;

module.exports = typeDefs;