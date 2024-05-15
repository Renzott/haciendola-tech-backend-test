import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authMiddleware from "../../middlewares/authMiddleware";
import { ProductService } from "../../../../application/ProductService";
import { ProductAdapter as SequelizeProductAdapter } from "../../../sqlite/ProductAdapter";
import { productListGet, productPost, productSearchGet, productDelete, productPut } from "./schemas";

interface SearchQuery {
    q: string
}

interface ProductRequestBody {
    sku: string;
    handle: string;
    title: string;
    description: string;
    grams: number;
    stock: number;
    price: number;
    comparePrice: number;
    barcode: string;
}

interface ProductParams {
    id: string;
}

const productRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/products', { preHandler: authMiddleware, schema: productListGet }, async (_request, _reply) => {

        const productService = new ProductService(new SequelizeProductAdapter);

        let data = await productService.findAll();

        return { data, status: 200 }
    })

    fastify.get('/products/search', { preHandler: authMiddleware, schema: productSearchGet }, async (request) => {
        const productService = new ProductService(new SequelizeProductAdapter);

        const { q } = request.query as SearchQuery;

        let data = await productService.findAllByTitle(q);

        return { data, status: 200 }
    })

    fastify.post('/product', { preHandler: authMiddleware, schema: productPost }, async (request: FastifyRequest) => {
        const productService = new ProductService(new SequelizeProductAdapter);

        let product = request.body as ProductRequestBody;

        let data = await productService.create(product);

        return { data, status: 200 }
    })

    fastify.put('/product', { preHandler: authMiddleware, schema: productPut }, async (request: FastifyRequest, reply: FastifyReply) => {
        const productService = new ProductService(new SequelizeProductAdapter);

        let product = request.body as ProductRequestBody;

        try {
            let data = await productService.update(product);
            return { data, status: 200 }
        } catch (err) {
            reply.status(400);
            return { message: (err as Error).message, status: 400 }
        }

    })

    fastify.delete('/product/:id', { preHandler: authMiddleware, schema: productDelete }, async (request: FastifyRequest,  reply: FastifyReply) => {
        const productService = new ProductService(new SequelizeProductAdapter);
        let { id } = request.params as ProductParams;

        let response = await productService.delete(id);

        let message = response ? "Producto eliminado" : "Producto no encontrado";

        let status = response ? 200 : 404;

        reply.status(status);

        return { message, status }
    })

}

export default productRoutes;