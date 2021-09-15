const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolver');
const mongoConnection = require('./config/db.config');
require('dotenv').config({ path: '.env' });

//ddbb

mongoConnection();

const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
          ]
});

server.listen().then(({ url }) => {
    console.log(`Server in url ${ url }`)
});
