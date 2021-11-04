const { ApolloServer } = require('apollo-server-express');
const express = require("express");
const mongoose = require('mongoose');
const { graphqlUploadExpress } = require("graphql-upload");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolver');
const jwt = require('jsonwebtoken');
const cors = require('./config/cors.config');
require('dotenv').config({ path: '.env' });

//ddbb

mongoose.connect('mongodb://localhost/instaclone', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, 
(err, _) => {
    if(err) {
        console.log('Connection Failed')
    } else {
        server();
    }
}

)

const server = async() => {
    
    const apolloServer = new ApolloServer({
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
        introspection: true,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
          ]
    });

    await apolloServer.start()
    const app = express();
    app.use(graphqlUploadExpress());
    app.use(cors);
    apolloServer.applyMiddleware({ app });

    await new Promise((r) => app.listen({ port: 4000}, r));

    console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
};