import { expect, vitest, beforeAll, test, describe } from "vitest";
import supertest from "supertest";
import { app } from "../src/app";
import request from "supertest";

describe("transactionRoutes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("teste se o usuário consegue fazer uma chamada HTTP", async () => {
    const response = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transaction",
        amount: 5000,
        type: "credit",
      })
      .expect(201);
  });
});
