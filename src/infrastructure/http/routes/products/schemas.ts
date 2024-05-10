import { FastifySchema } from "fastify";

export const productListGet: FastifySchema = {
    tags: ['Product'],
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            sku: { type: 'string' },
                            handle: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            grams: { type: 'number' },
                            stock: { type: 'number' },
                            price: { type: 'number' },
                            comparePrice: { type: 'number' },
                            barcode: { type: 'string' }
                        }
                    }
                },
                status: { type: 'number' }
            }
        },
    }
}

export const productSearchGet: FastifySchema = {
    tags: ['Product'],
    querystring: {
        type: 'object',
        properties: {
            q: { type: 'string' }
        },
        required: ['q']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            sku: { type: 'string' },
                            handle: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            grams: { type: 'number' },
                            stock: { type: 'number' },
                            price: { type: 'number' },
                            comparePrice: { type: 'number' },
                            barcode: { type: 'string' }
                        }
                    }
                },
                status: { type: 'number' }
            }
        },
    }
}

// product post schema = create product

export const productPost: FastifySchema = {
    tags: ['Product'],
    body: {
        type: 'object',
        properties: {
            sku: { type: 'string' },
            handle: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            grams: { type: 'number' },
            stock: { type: 'number' },
            price: { type: 'number' },
            comparePrice: { type: 'number' },
            barcode: { type: 'string' }
        },
        required: ['sku', 'handle', 'title', 'description', 'grams', 'stock', 'price', 'comparePrice', 'barcode']
    },
    response: {
        201: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        sku: { type: 'string' },
                        handle: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        grams: { type: 'number' },
                        stock: { type: 'number' },
                        price: { type: 'number' },
                        comparePrice: { type: 'number' },
                        barcode: { type: 'string' }
                    }
                },
                status: { type: 'number' }
            }
        },
    }
}

// product put schema = update product

export const productPut: FastifySchema = {
    tags: ['Product'],
    body: {
        type: 'object',
        properties: {
            sku: { type: 'string' },
            handle: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            grams: { type: 'number' },
            stock: { type: 'number' },
            price: { type: 'number' },
            comparePrice: { type: 'number' },
            barcode: { type: 'string' }
        },
        required: ['sku', 'handle', 'title', 'description', 'grams', 'stock', 'price', 'comparePrice', 'barcode']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        sku: { type: 'string' },
                        handle: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        grams: { type: 'number' },
                        stock: { type: 'number' },
                        price: { type: 'number' },
                        comparePrice: { type: 'number' },
                        barcode: { type: 'string' }
                    }
                },
                status: { type: 'number' }
            }
        },
    }
}


// param: /product/:id
export const productDelete: FastifySchema = {
    tags: ['Product'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                status: { type: 'number' }
            }
        },
    }
}