/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your schema
 */

//! Most of the time if you have a resolver is when you need to compute something in runtime 
//! that's different than the source where you got it

// One dedicated resolver overrides the parent resolver.
// For example if the parent resolver says the ID is 3 but the custom resolver says it's 5, it's gonna be 5

module.exports = {
  Query: {
    //The second parameter are the arguments, they're used along with the query in the resolvers to get data
    //They must be defined in your schema
      pets(_, {input}, ctx){
        return ctx.models.Pet.findMany(input)
      },
      pet(_, {input}, ctx){
        return ctx.models.Pet.findOne(input)
      }
  },
  Mutation: {
    newPet(_, {input}, ctx){
      const pet = ctx.models.Pet.create(input)
      return pet
    },
    updatePet(_, {input}, ctx){
      const pet = ctx.models.Pet.update(input.id, input.updates)
      return pet
    }
  },
  // Pet: {
  //   img(pet) {
  //     return pet.type === 'DOG'
  //       ? 'https://placedog.net/300/300'
  //       : 'http://placekitten.com/300/300'
  //   }
  // },
  // User: {
    
  // }
}
