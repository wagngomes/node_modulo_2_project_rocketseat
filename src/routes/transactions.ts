import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkSessionsIdExists } from "../middlewares/check-session-Id-exists";
import { request } from "http";

export function transactionRoute(app: FastifyInstance) {
  app.get(
    "/transactions",
    {
      preHandler: [checkSessionsIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;
      const transactions = await knex("transactions")
        .where("session_id", sessionId)
        .select();

      return { transactions };
    }
  );

  app.post("/transactions", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });
    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId,
    });

    return reply.status(201).send();
  });

  app.get(
    "/:id",
    {
      preHandler: [checkSessionsIdExists],
    },
    async (request) => {
      const getTransactionsParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getTransactionsParamsSchema.parse(request.params);

      const transaction = await knex("transactions").select("id", id).first();

      return { transaction };
    }
  );
  app.get(
    "/summary",
    {
      preHandler: [checkSessionsIdExists],
    },
    async () => {
      const summary = await knex("transactions")
        .sum("amount", { as: "amount" })
        .first();

      return { summary };
    }
  );
}
