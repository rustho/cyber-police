import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  });

  // Get port from environment variable or use default
  const port = process.env.PORT || 5001;
  const host = process.env.HOST || "localhost";

  await app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
  });
}

bootstrap();
