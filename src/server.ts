import fastify from "fastify";
import { transactionRoute } from "./routes/transactions";
import cookie from "@fastify/cookie";

const app = fastify();


app.register(cookie)
app.register(transactionRoute)



app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("servidor no ar");
  });
