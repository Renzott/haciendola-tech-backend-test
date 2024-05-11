import { FastifySchema } from "fastify";


export const userRegisterPost: FastifySchema = {
    tags: ['User'],
    body: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
            username: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                token: { type: 'string' }
            }
        },
        400: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        500: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                ok: { type: 'boolean' }
            }
        }
    }
}


export const userLoginSchema: FastifySchema = {
    tags: ['User'],
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string' },
            password: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                token: { type: 'string' }
            }
        },
        400: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
}

export const resetPasswordSchema: FastifySchema = {
    tags: ['User'],
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string' },
            password: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            }
        },
        400: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
}