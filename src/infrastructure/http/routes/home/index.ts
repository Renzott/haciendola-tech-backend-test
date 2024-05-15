import { FastifyInstance } from "fastify";

const homeRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", { schema: { hide: true } }, async (_request, reply) => {
    reply.type("text/html").code(200);
    return '<style>*{color-scheme: dark light ;}</style><span>Hola, esta es la API de Hacienda Tech Prueba, puedes ir a <a href="/docs">/docs</a> para ver los endpoints</span>';
  });
};

export default homeRoutes;
