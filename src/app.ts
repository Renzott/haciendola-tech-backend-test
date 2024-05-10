import fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import builderServer from "./infrastructure/builder"
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'

async function startServer() {
    const app = fastify({ logger: true }).withTypeProvider<JsonSchemaToTsProvider>();

    await builderServer(app);

    app.listen({ port: 3000 });
}

startServer();