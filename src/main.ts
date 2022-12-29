import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  await app.listen(3000 + Math.round(Math.random() * 100));
  logger.log(await app.getUrl())
}
bootstrap();
