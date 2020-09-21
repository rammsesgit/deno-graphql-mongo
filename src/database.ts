// 'https://deno.land/x/mongo@v0.12.1/mod.ts'
import { MongoClient, ObjectId } from 'https://deno.land/x/mongo/mod.ts'
import { config } from 'https://deno.land/x/dotenv/mod.ts'

const { MONGO_URI } = config({ path: '../.env', defaults: '../.env.defaults' })

// MongoDB
const client = new MongoClient()
client.connectWithUri(MONGO_URI)
const db = client.database('deno_graphql')

// Collections
const usersCollection = db.collection('users')

export { ObjectId, db, usersCollection }
