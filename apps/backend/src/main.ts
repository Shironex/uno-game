import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  const port = configService.get<number>('PORT') || 5000;

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
  });

  console.debug(
    'Cors enabled for frontend url',
    configService.get<string>('FRONTEND_URL'),
  );

  await app.listen(port);
  logger.debug('Application started');
  logger.debug(`Listening on port ${port}`);
}
bootstrap();
