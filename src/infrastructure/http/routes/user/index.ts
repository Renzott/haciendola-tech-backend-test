import { FastifyInstance, FastifyRequest, FastifySchema } from "fastify";
import { resetPasswordSchema, userLoginSchema, userRegisterPost } from "./schema";
import { createToken } from "../../../../libs/jwt";
import { decrypt, encrypt } from "../../../../libs/crypto";
import { UserService } from "../../../../application/UserService";
import { UserAdapter as SequelizeUserAdapter } from "../../../sqlite/UserAdapter";
import { User } from "../../../../domain/user/User";

interface LoginRequestBody {
    email: string;
    password: string;
}

interface RegisterRequestBody {
    username: string;
    email: string;
    password: string;
}

const userRoutes = async (fastify: FastifyInstance, options: any) => {

    fastify.post('/register', { schema: userRegisterPost }, async (request: FastifyRequest<{ Body: RegisterRequestBody }>, reply) => {

        const { username, email, password } = request.body;

        const encryptPassword = encrypt(password);

        let token = createToken({ username, email, password: encryptPassword });

        return { message: "Registro Exitoso", token };
    })

    fastify.post('/login', { schema: userLoginSchema }, async (request: FastifyRequest<{ Body: LoginRequestBody }>, reply) => {

        try {
            const { email, password } = request.body;

            const userService = new UserService(new SequelizeUserAdapter);

            let user = await userService.findByEmail(email);

            if (!user) {
                reply.code(404);
                return { message: "Usuario no encontrado", ok: false}
            }

            if (decrypt(user.password) !== password) {
                reply.code(400);
                return { message: "Contraseña incorrecta", ok: false}
            }

            let token = createToken({ email, password: user.password });

            return { message: "Login Exitoso", token, ok: true }
        } catch (error) {
            reply.code(500);
            return { message: "Error en el servidor", ok: false }
        }
    })

    fastify.put('/resetpassword', { schema: resetPasswordSchema }, async (request: FastifyRequest<{ Body: RegisterRequestBody }>, reply) => {
        const { email, password, username } = request.body;

        const userService = new UserService(new SequelizeUserAdapter);

        let user = await userService.findByEmail(email);

        if (!user) {
            reply.code(404);
            return { message: "Usuario no encontrado", ok: false }
        }

        if (user.username !== username) {
            reply.code(403);
            return { message: "No tienes permisos para realizar esta acción", ok: false}
        }

        const userData: User = {
            id: user.id,
            username: user.username,
            email: user.email,
            password: "",
        }
        
        const encryptPassword = encrypt(password);
        userData.password = encryptPassword;

        await userService.update(userData);

        return { message: "Contraseña actualizada", ok: true }
    })
}

export default userRoutes;