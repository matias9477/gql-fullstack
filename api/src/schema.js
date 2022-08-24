const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL(Schema Definition Language).
 */

 //?As long as every field on your schema is accounted for your default resolver or a custom one, you're done

const typeDefs = gql`
  type User {
        id: ID!  
        username: String!
  }

  type Pet {
        id: ID!
        createdAt: String!
        name: String!
        type: String!
  }

  input PetInput {
      name: String
      type: String
  }

  input NewPetInput {
      name: String!
      type: String!
  }

  type Query { 
      # The property name does not matter, as long as the value is correct
        pets(input: PetInput): [Pet]!
        pet(input: PetInput): Pet!
  }

  type Mutation {
      newPet(input: NewPetInput!):Pet!
  }

`;

module.exports = typeDefs
