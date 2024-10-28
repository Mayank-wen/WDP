// Details chapter 10
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require('cors');
const helmet = require('helmet')
const typeDefs = require('./schema')
const express = require('express');
require('dotenv').config();
const mongoose = require("mongoose")
const models = require('./models');
const resolvers = require('./resolvers');
const port = process.env.PORT || 4001;
const jwt = require('jsonwebtoken');
// const db = require('./db')
const app = express();
mongoose.connect(`mongodb+srv://${process.env.Mongousername}:${process.env.Mongopassword}@cluster0.a52pn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => { app.listen(4000); }
    )
    .catch(err => { console.log(err); }
    );
app.use(helmet());
app.use(cors());


// const DB_HOST = process.env.DB_HOST;

console.log(typeDefs);

// db.connect(DB_HOST);

// Apollo Server setup
// get the user info from a JWT
// const getUser = token => {
//     if (token) {
//         try {
//             return jwt.verify(token, process.env.JWT_SECRET);
//         } catch (err) {
//             throw new Error('Session invalid');
//         }
//     }
// };
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
//     context: async ({ req }) => {
//         const token = req.headers.authorization;
//         const user = await getUser(token);
//         return { models, user };
//     }
// });
// server.applyMiddleware({ app, path: '/api' });
// app.listen({ port }, () =>
//     console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`)
// );
