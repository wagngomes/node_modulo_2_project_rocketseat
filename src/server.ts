import fastify from "fastify";
import { transactionRoute } from "./routes/transactions";

const app = fastify();

app.register(transactionRoute)



app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("servidor no ar");
  });
