import { ObjectId, usersCollection as users } from '../database.ts'

export default {
  Query: {
    getOneUser: async (parent: any, args: any, context: any, info: any) => {
      const user = await users.findOne({ _id: ObjectId(args.id) })
      return user ? { ...user, id: user?._id.$oid } : null
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
