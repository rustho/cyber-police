import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap(); 