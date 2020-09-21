/**
 * (oak-graphql@0.5.9)
 * Use deno v1.3.3 in order to avoid:
 * TS1371 [ERROR]: This import is never used as a value and must use 'import type' because the
 * 'importsNotUsedAsValues' is set to 'error'.
 */

// 'https://deno.land/x/oak@v6.0.1/mod.ts'
import { Application, Router, RouterContext } from 'https://deno.land/x/oak/mod.ts'
// 'https://x.nest.land/oak-graphql@0.5.9/mod.ts'
import { applyGraphQL } from 'https://deno.land/x/oak_graphql/mod.ts'
import { config } from 'https://deno.land/x/dotenv/mod.ts'

import { resolvers, types } from './graphql/index.ts'

const { PORT } = config({ path: '../.env', defaults: '../.env.defaults' })

const app = new Application()

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
