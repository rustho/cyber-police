import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Cyber Police API")
    .setDescription("The Cyber Police game API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Save OpenAPI spec to file for type generation
  const fs = require("fs");
  const path = require("path");

  // Create absolute path to the output file
  const outputDir = path.resolve(__dirname, "../../../packages/shared/src");
  const outputPath = path.join(outputDir, "openapi.json");

  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the file
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  console.log(`OpenAPI spec written to ${outputPath}`);

  // Enable CORS
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "https://cyber-police.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // Get port from environment variable or use default
  const port = process.env.PORT || 5001;
  const host = process.env.HOST || "localhost";

  await app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
  });
}

bootstrap();
