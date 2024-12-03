import fastify from "fastify";
const app = fastify();
app.get("/", () => {
  return "teste rodando";
});
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("servidor no ar");
  });
