import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.enableCors();
  const staticPath = path.join(__dirname, '..', 'files');
  app.use('/files', express.static(staticPath));
  await app.listen(200);
}
bootstrap();
