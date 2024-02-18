import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from '../tasks/tasks.service';
import configuration from '../../config/configuration';
import { DataSource } from 'typeorm';
import { TokenDataModule } from '../tokenData/tokenData.module';
import typeorm from 'src/config/typeorm';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TokenDataModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
  ],
  controllers: [],
  providers: [TasksService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
