import { FastifyInstance, FastifyRequest, FastifySchema } from "fastify";
import authMiddleware from "../../middlewares/authMiddleware";
import { resetPasswordSchema, userLoginSchema, userRegisterPost } from "./schema";
import { createToken } from "../../../../libs/jwt";
import { decrypt, encrypt } from "../../../../libs/crypto";
import { UserService } from "../../../../application/UserService";
import { UserAdapter as SequelizeUserAdapter } from "../../../sqlite/UserAdapter";

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

    fastify.post('/login', { schema: userLoginSchema }, async (request: FastifyRequest<{ Body: LoginRequestBody }>, _reply) => {

        try {
            const { email, password } = request.body;

            const userService = new UserService(new SequelizeUserAdapter);

            let user = await userService.findByEmail(email);

            if (!user) {
                return { message: "Usuario no encontrado" }
            }
            console.log(user.password);
            if (decrypt(user.password) !== password) {
                return { message: "Contraseña incorrecta" }
            }

            let token = createToken({ email, password: user.password });

            return { message: "Login Exitoso", token };
        } catch (error) {
            return { message: "Error en el servidor" }
        }
    })

    fastify.put('/resetpassword', { schema: resetPasswordSchema }, async (request: FastifyRequest<{ Body: RegisterRequestBody }>, _reply) => {
        const { email, password } = request.body;

        const userService = new UserService(new SequelizeUserAdapter);

        let user = await userService.findByEmail(email);

        if (!user) {
            return { message: "Usuario no encontrado" }
        }

        const encryptPassword = encrypt(password);
        user.password = encryptPassword;

        await userService.update(user);

        return { message: "Contraseña actualizada" }
    })
}

export default userRoutes;