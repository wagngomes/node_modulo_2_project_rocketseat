import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from 'zod'
import { randomUUID } from "crypto";
import { checkSessionsIdExists } from "../middlewares/check-session-Id-exists";
import { request } from "http";



export function transactionRoute (app: FastifyInstance) {

    app.get("/",{
        preHandler: [checkSessionsIdExists]       
    }, async(request) => {

        const { sessionId } = request.cookies
        const transactions = await knex('transactions').select('sessionId')

        return {transactions}                                                                            
    });

    app.post('/', async(request, reply) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
            session_id: z.string().uuid()
        
        })
        let sessionId = request.cookies.sessionId

        if(!sessionId){
            sessionId = randomUUID()
            path: '/'
            maxAge: 60*60*24*7

        }

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        await knex('transactions')
        .insert({
            id: randomUUID(),
            title,
            amount: type === 'credit'? amount: amount * -1

        })
        
        return reply.status(201).send()
    })

    app.get('/:id', async(request) => {

        const getTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })
        

        const { id } = getTransactionsParamsSchema.parse(request.params)

        const transaction = await knex('transactions').select('id', id).first()

        return { transaction }

    })
    app.get('/summary', async() => {
        knex('transactions').sum('amount', {as: 'amount'}).first()

    })

    

}