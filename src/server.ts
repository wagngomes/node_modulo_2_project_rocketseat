import { app } from "./app";

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(process.env.DATABASE_URL)
    console.log("servidor no ar");
  });
