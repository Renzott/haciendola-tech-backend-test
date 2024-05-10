import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../../../libs/jwt";
import { UserService } from "../../../application/UserService";
import { UserAdapter as SequelizeUserAdapter } from "../../sqlite/UserAdapter";

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    // if no contains bearer token
    if (!request.headers.authorization || !request.headers.authorization.includes('Bearer')) {
        return reply.code(401).send({ message: 'Token no encontrado' });
    }

    const token = request.headers.authorization.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        const json = JSON.parse(JSON.stringify(decoded));
        
        const userService = new UserService(new SequelizeUserAdapter);

        let user = await userService.findByEmail(json?.email);

        if (!user) 
            return reply.code(401).send({ message: 'Usuario no encontrado' });
        
    } catch (error) {
        return reply.code(401).send({ message: 'Token invalido' });
    }

}

export default authMiddleware;