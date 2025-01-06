import { expect, vitest } from "vitest";
import supertest from "supertest";
import { app } from "../src/app";

test("teste se o usuário consegue fazer uma chamada HTTP", async () => {
  const response = await reques(app.server).post("/transactions").send({
    title: "new transaction",
    amount: 5000,
    type: "credit",
  });
});
