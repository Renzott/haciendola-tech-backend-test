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
    const HOST = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

    console.log(`Server running on port ${PORT_ENV}`);

    app.listen({ host: HOST, port: PORT_ENV });
}

startServer();