const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const cors = require('cors');

const typeDefs = require('./schema');
const db = require('./db');
const models = require('./models');



require('dotenv').config();

const port = process.env.PORT || 4002;
const DB_HOST = process.env.DB_HOST;

const app = express();

db.connect(DB_HOST);

//Cors Middleware
app.use(cors());



const resolvers = {
    Query: {
        quotes: async () => {
            return await models.Quote.find();
        },
        quote: async (parent, args) => {
            return await models.Quote.findById(args.id);
        }
    },
    Mutation: {
        newQuote: async (parent, args) => {
            return await models.Quote.create({
                content: args.content,
                author: 'Teddy Roosevelt'
            })
        }
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers
    // validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    // context: async({req}) => {
    //     return{models};
    //}
});
server.applyMiddleware({app, path: '/api'});

app.listen({port}, () =>
console.log(
    `GraphQl Server running: ${port}${server.graphqlPath}`
))