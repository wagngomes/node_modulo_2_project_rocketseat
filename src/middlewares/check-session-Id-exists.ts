import { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionsIdExists(request: FastifyRequest, reply: FastifyReply){

    const sessionId = request.cookies.sassionId
    if(!sessionId){
        return reply.status(401).send({
            error: 'Unauthorized'
        })
    }


}