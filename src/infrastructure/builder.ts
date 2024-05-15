import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import cors from '@fastify/cors'
import { handleError, handleNotFound } from "./http/errors";

import productRoutes from './http/routes/products'
import userRoutes from "./http/routes/user";
import homeRoutes from "./http/routes/home";

export default async function (app: FastifyInstance) {
    app.setErrorHandler(handleError)
    app.setNotFoundHandler(handleNotFound);

    await app.register(swagger,{
        swagger:{
            info:{
                title: 'Haciendola API',
                description: 'Building a REST API with Fastify',
                version: '0.1.0'
            },
            securityDefinitions:{
                Bearer:{
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            },
        },
    })

    app.register(cors)
    
    app.register(homeRoutes)
    app.register(productRoutes, { prefix: '/api/v1'})
    app.register(userRoutes, { prefix: '/api/v1'})
    
    app.register(swaggerUI, {
        routePrefix: '/docs',
    })
}