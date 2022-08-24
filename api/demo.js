const gql = require('graphql-tag')
const {ApolloServer} = require('apollo-server')

// An AST(abstract syntax tree) represents a GraphQL document in a type-safe, machine-readable format.
// Using ! in the type means it will expect to have a value. If you put it after an array, it'll expect it to be an array
//The types inside a schema are called scholars
//gql will look for a type called query to use as a query
const typeDefs = gql`
    type User {
        email: String! 
        avatar: String
        friends: [User]!
    }

    type Shoe {
        brand: String!
        size: Int!
    }

    input ShoesInput {
        brand: String,
        size: Int
    }

    input NewShoeInput {
        brand: String!
        size: Int!
    }

    type Query {
        me: User!
        shoes(input: ShoesInput): [Shoe]!
    }

    type Mutation {
        newShoe(input: NewShoeInput!): Shoe!
    }
`
/*
*Query types or object types
i.e. type Query {
special type that the gql server expects it to have
To create a query type
-Create it in the schema using SDL (Schema Definition Language)
-Add fields to the query type
-Create resolvers that for the fields
*/

/*
*Resolvers
gql only has one endpoint and ignores http so you won't get error codes for your requests
you can write a resolver for each field if you want
!Resolvers names must match the eexact field name on your schema's types (example me in type query and me() in query resolver)
-resolvers can be async
-can retrieve data from any source
*/
const resolvers = {
    Query: {
        shoes(_, {input}){
            return [
                {brand: 'nike', size: 12},
                {brand: 'adidas', size: 13},
            ].filter(shoe => shoe.brand === input.brand)
        },
        me() {
            return {
                email: 'matias@turra.com',
                avatar: 'http://yoda.png',
                friends: []
            }
        }
    },
    Mutation: {
        newShoe(_, {input}){
            return input
        }
    }
    
}
/*
* Schema + Resolver => Server
Te create a server you need at least a query type with a field and a resolver for that field
*/

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000)
    .then(() => console.log('On port 4000 🚀'))