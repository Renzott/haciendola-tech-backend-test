import fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import builderServer from "./infrastructure/builder"
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { initDatabase } from "./scripts/database";

async function startServer() {
    const app = fastify({ logger: true }).withTypeProvider<JsonSchemaToTsProvider>();

    // Verify sqlite if exists
    initDatabase();

    await builderServer(app);

    const PORT_ENV = Number(process.env.PORT) || 3000;

    app.listen({ port: PORT_ENV})
}

startServer();