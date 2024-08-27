const { ApolloServer, gql } = require("apollo-server-express");
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

// Define your schema
const typeDefs = gql`
 type top{
 name:String}   

  type Pizza {
    id: ID
    size: String
    slices: Int
    toppings: [top]
  }

  type Query {
    pizza: Pizza
  }
`;

// Define your resolvers :resolves the data that the user has requested( stores the data fro the time being)
const resolvers = {
    Query: {
        pizza: () => {
            return {
                id: "1",
                size: "large",
                slices: 8,
                toppings: [{ name: "cheese" },
                { name: "pepperoni" }]
            }
        }
    }
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Apply middleware to the Express app
server.applyMiddleware({ app, path: '/api' });

// Start the server
app.listen({ port }, () =>
    console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`)
);

// app.get('/',(req,res)=> res.send("hello world"))
//  app.listen(4000,()=> console.log(`listening on port ${port}`))
