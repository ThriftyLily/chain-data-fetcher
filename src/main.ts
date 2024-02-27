import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './modules/logger/logger.service';
import { MainConfig } from './config/main';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appLogger = new LoggerService(configService);
  app.useLogger(appLogger);

  const { appPort } = configService.get<MainConfig>('main');

  await app.listen(appPort);
}
bootstrap();
