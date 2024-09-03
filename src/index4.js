// for user authentication and authorization
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require('./schema')
const express = require('express');
require('dotenv').config();
const db = require('./db')
const app = express();
const models = require('./models');
const resolvers = require('./resolvers');
const port = process.env.PORT || 4001;
const DB_HOST = process.env.DB_HOST;
const jwt = require('jsonwebtoken');
console.log(typeDefs);
db.connect(DB_HOST);
// Apollo Server setup
// get the user info from a JWT
const getUser = token => {
    if (token) {
        try {
            // return the user information from the token
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization;
        // try to retrieve a user with the token
        const user = getUser(token);
        // for now, let's log the user to the console:
        console.log(user);
        // add the db models and the user to the context
        return { models, user };
    }
});



server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
    console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`)
);