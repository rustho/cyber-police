import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {} 