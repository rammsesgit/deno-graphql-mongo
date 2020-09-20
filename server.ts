// 'https://deno.land/x/oak@v6.0.1/mod.ts'
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

console.log("Server start at http://localhost:8000");
await app.listen({ port: 8000 });
