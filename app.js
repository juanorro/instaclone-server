const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolver');
const mongoConnection = require('./config/db.config');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

//ddbb

mongoConnection();

const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization;

            if(token) {
                try {
                    const user = jwt.verify(
                        token.replace('Bearer ', ''),
                        process.env.SECRET_KEY
                    );

                    return {
                        user,
                    }
                } catch (error) {
                    console.log('### ERROR ###');
                    console.log(error);
                    throw new Error('token invalid')
                }
            }
        },
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
          ]
});

server.listen().then(({ url }) => {
    console.log(`Server in url ${ url }`)
});
