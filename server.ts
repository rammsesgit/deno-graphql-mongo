/**
 * (oak-graphql@0.5.9)
 * Use deno v1.3.3 in order to avoid:
 * TS1371 [ERROR]: This import is never used as a value and must use 'import type' because the
 * 'importsNotUsedAsValues' is set to 'error'.
 */

// 'https://deno.land/x/oak@v6.0.1/mod.ts'
import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";
// 'https://x.nest.land/oak-graphql@0.5.9/mod.ts'
import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";

const app = new Application();

const types = gql`
  type User {
    firstName: String
    lastName: String
  }

  input UserInput {
    firstName: String
    lastName: String
  }

  type Query {
    getUser(id: String): User
  }
`;

const resolvers = {
  Query: {
    getUser: async (
      parent: any,
      { id }: { id: string },
      context: any,
      info: any,
    ) => {
      return {
        firstName: "dummy firstName",
        lastName: "dummy lastName",
      };
    },
  },
};

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: RouterContext) => {
    return { advice: "This context is accessible to every resolvers." };
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("GraphQL Playground at http://localhost:8000/graphql");
await app.listen({ port: 8000 });
