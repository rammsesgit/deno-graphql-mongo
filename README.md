# deno-graphql-mongo

A simple backend using Deno, GraphQL and MongoDB.

> Recommendation (VS Code): `Ctrl + P` and paste `ext install denoland.vscode-deno` in order to gain intellisense support, intelligent module import and more features.

---

## How to run

### MongoDB

You can use Docker to prepare a Mongo image using the following command the first time

```sh
docker run -v ~/docker/mongo_test/data:/data/db -p 27017:27017 --name mongo_test -d mongo:4.2.9-bionic
```

and the following times this other

```sh
docker start mongo_test
```

### Deno

```sh
deno run --allow-net --allow-write --allow-read --allow-plugin --unstable server.ts
```

Then go to [http://localhost:8000/graphql](http://localhost:8000/graphql) to use the GrapghQL playground.
