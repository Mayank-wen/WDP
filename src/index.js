const { ApolloServer, gql } = require("apollo-server-express")
const express = require('express')
const app =express()
const port = process.env.PORT || 4000
const typeDefs = gql`type Query{
hello: String}`;
const resolvers = { Query: { hello: () => "hello world!" } };
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });
app.listen({ port }, () => console.log(`Graphql Server running  at ${port} ${server.graphqlPath}`))
// app.get('/',(req,res)=> res.send("hello world"))
//  app.listen(4000,()=> console.log(`listening on port ${port}`))