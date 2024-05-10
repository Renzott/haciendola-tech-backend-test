import { error } from "console";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const handleError = (error: FastifyError, _request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(500).send({ message: 'Error: ' + error.message, ok: false });
}

export const handleNotFound = (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(404).send({ message: 'Ruta no encontrada', statusCode: 404 });
}