// 'https://x.nest.land/oak-graphql@0.5.9/mod.ts'
import { gql } from 'https://deno.land/x/oak_graphql/mod.ts'

export default gql`
  type User {
    id: ID
    username: String
    firstName: String
    lastName: String
  }

  input UserInput {
    username: String
    firstName: String
    lastName: String
  }

  type AddOutput {
    id: ID
  }
  type UpdateOutput {
    matchedCount: Int
    modifiedCount: Int
  }
  type DeleteOutput {
    deleteCount: Int
  }

  type Query {
    getOneUser(id: String): User
  }

  type Mutation {
    addOneUser(data: UserInput!): AddOutput!
    updateOneUser(data: UserInput, id: String!): UpdateOutput!
    deleteOneUser(id: String!): DeleteOutput!
  }
`
