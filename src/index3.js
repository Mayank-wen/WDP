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
console.log(typeDefs);
// let notes = [
//   { id: '1', content: 'This is a note', author: 'Mayank Kush' },
//   { id: '2', content: 'This is an another note', author: 'Adam Scott' },
//   { id: '3', content: 'This is also an another note', author: 'Harlow Everly' },
//   { id: '4', content: 'This is at last the last note', author: 'Riley Harrison' }
// ]
// const typeDefs = gql`
//   type Note {
//     id: ID!
//     content: String!
//     author: String!
//   }
//   type Query {
//     hello: String
//     notes: [Note!]!
//     note(id: ID!): Note
//   }
  
//   type Mutation {
//     newNote(content: String!, author: String!): Note!
//   }
// `;
// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//     notes: () => notes,
//     note: (parent, args) => {
//       return notes.find(note => note.id === args.id);
//     }
//   },
//   notes: async () => {
//     return await models.Note.find();
//    },
//   Mutation: {
//     newNote: async (parent, args) => {
//         return await models.Note.create({
//         content: args.content,
//         author: 'Adam Scott'
//         });
//        }
//     }
//   }
// ;
db.connect(DB_HOST);
// Apollo Server setup
const server = new ApolloServer({
 typeDefs,
 resolvers,
 context: () => {
 // Add the db models to the context
 return { models };
 }
});

// an instance of ApolloServer
// const server = new ApolloServer({ typeDefs, resolvers });

// middleware to the Express app
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`)
);
