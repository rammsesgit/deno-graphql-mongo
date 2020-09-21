/**
 * (oak-graphql@0.5.9)
 * Use deno v1.3.3 in order to avoid:
 * TS1371 [ERROR]: This import is never used as a value and must use 'import type' because the
 * 'importsNotUsedAsValues' is set to 'error'.
 */

// 'https://deno.land/x/oak@v6.0.1/mod.ts'
import { Application, Router, RouterContext } from 'https://deno.land/x/oak/mod.ts'
// 'https://x.nest.land/oak-graphql@0.5.9/mod.ts'
import { applyGraphQL, gql } from 'https://deno.land/x/oak_graphql/mod.ts'
// 'https://deno.land/x/mongo@v0.12.1/mod.ts'
import { MongoClient, ObjectId } from 'https://deno.land/x/mongo/mod.ts'
import { config } from 'https://deno.land/x/dotenv/mod.ts'

const { PORT, MONGO_URI } = config()

const app = new Application()

// MongoDB
const client = new MongoClient()
client.connectWithUri('mongodb://localhost:27017')
const db = client.database('deno_graphql')
const users = db.collection('users')

const types = gql`
  type User {
    id: ID!
    username: String!
    firstName: String
    lastName: String
  }

  input UserInput {
    username: String
    firstName: String
    lastName: String
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
    addOneUser(data: UserInput!): User
    updateOneUser(data: UserInput, id: String!): UpdateOutput
    deleteOneUser(id: String!): DeleteOutput
  }
`

const resolvers = {
  Query: {
    getOneUser: async (parent: any, args: any, context: any, info: any) => {
      return await users.findOne({ _id: ObjectId(args.id) })
    }
  },

  Mutation: {
    addOneUser: async (parent: any, args: any, context: any, info: any) => {
      const { $oid: id } = await users.insertOne(args.data)

      return { id }
    },
    updateOneUser: async (parent: any, args: any, context: any, info: any) => {
      const { matchedCount, modifiedCount } = await users.updateOne(
        { _id: ObjectId(args.id) },
        { $set: args.data }
      )

      return { matchedCount, modifiedCount }
    },
    deleteOneUser: async (parent: any, args: any, context: any, info: any) => {
      return {
        deleteCount: await users.deleteOne({ _id: ObjectId(args.id) })
      }
    }
  }
}

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: RouterContext) => {
    return { advice: 'This context is accessible to every resolvers.' }
  }
})

app.use(GraphQLService.routes(), GraphQLService.allowedMethods())

console.log(`GraphQL Playground at http://localhost:${PORT}/graphql`)
await app.listen({ port: Number(PORT) })
