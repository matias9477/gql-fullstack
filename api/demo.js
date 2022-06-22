const gql = require('graphql-tag')
const {ApolloServer} = require('apollo-server')

// An AST represents a GraphQL document in a type-safe, machine-readable format.
// Using ! in the type means it will expect to have a value. If you put it after an array, it'll expect it to be an array
//The types inside a schema are called scholars
//gql will look for a type called query to use as a query
const typeDefs = gql`
    type User {
        email: String! 
        avatar: String
        friends: [User!]!
    }

    type Query {
        me: User!
    }
`

//Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                email: 'matias@turra.com',
                avatar: 'http://yoda.png',
                friends: []
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000)
    .then(() => console.log('on port 4000'))