import { expect, vitest, beforeAll, test, describe, afterAll, beforeEach} from "vitest";
import supertest from "supertest";
import { app } from "../src/app";
import request from "supertest";
import { execSync } from "node:child_process";

describe("transactionRoutes", () => {

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  test('o usuário deve conseguir fazer uma chamada HTTP', async () => {
    const response = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transaction",
        amount: 5000,
        type: "credit",
      })
      .expect(201);
  });

  test('deve ser possível listar todas as transações', async() => {
    const createTransactionResponse = await request(app.server)
    .post("/transactions")
    .send({
      title: "new transaction",
      amount: 5000,
      type: "credit",
    })
    const cookies = createTransactionResponse.get('Set-Cookie')
    if(!cookies){
      throw new Error('cookies não encontrados')
    }


    const listTransactionsResponse = await request(app.server)
    .get("/transactions")
    .set('Cookie', cookies)
    .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: "new transaction",
        amount: 5000,

      })
    ])

  })
});
