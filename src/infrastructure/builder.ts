import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { handleError, handleNotFound } from "./http/errors";

import productRoutes from './http/routes/products'
import userRoutes from "./http/routes/user";

export default async function (app: FastifyInstance) {
    app.setErrorHandler(handleError)
    app.setNotFoundHandler(handleNotFound);
    await app.register(swagger)
    
    app.register(productRoutes, { prefix: '/api/v1'})
    app.register(userRoutes, { prefix: '/api/v1'})
    
    
    app.register(swaggerUI, {
        routePrefix: '/docs',
    })
}