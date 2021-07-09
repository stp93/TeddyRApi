const {gql} = require('apollo-server-express');

module.exports = gql`


type Quote{
    id: ID
    content: String
    author: String
    
}
type Query{
    quotes: [Quote]
    quote(id: ID): Quote
   
}
type Mutation{
    newQuote(content: String!): Quote
}
`