import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import configuration from './infra/config/configuration';
import { Logger } from '@nestjs/common';
const logger = new Logger('MAIN');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = configuration().apiPort;
  const nodeEnv = configuration().nodeEnv;

  app.enableCors({
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Credentials',
      'content-type',
      'authorization',
      'ngrok-skip-browser-warning',
    ],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  await app.listen(port);
  logger.verbose(
    `Marketplace Backend API is running in ${nodeEnv} mode on port ${port}.`,
  );
}
bootstrap();
