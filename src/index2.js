const { ApolloServer, gql } = require("apollo-server-express");
const express = require('express');
require('dotnev').config();
const db = require('./db')
const app = express();
const port = process.env.PORT || 4001;
const DB_HOST = process.env.DB_HOST;
const models = require('./models')
let notes = [
  { id: '1', content: 'This is a note', author: 'Mayank Kush' },
  { id: '2', content: 'This is an another note', author: 'Adam Scott' },
  { id: '3', content: 'This is also an another note', author: 'Harlow Everly' },
  { id: '4', content: 'This is at last the last note', author: 'Riley Harrison' }
]
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note
  }
  
  type Mutation {
    newNote(content: String!, author: String!): Note!
  }
`;
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      const noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: args.author
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

// an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// middleware to the Express app
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`)
);

