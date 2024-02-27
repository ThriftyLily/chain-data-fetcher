import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from '../tasks/tasks.service';
import { DataSource } from 'typeorm';
import { TokenDataModule } from '../tokenData/tokenData.module';
import typeorm from 'src/config/typeorm';
import { LoggerModule } from '../logger/logger.module';
import main from 'src/config/main';
import { UserModule } from '../user/user.module';
import { StatsModule } from '../stats/stats.module';

@Module({
  imports: [
    LoggerModule,
    TokenDataModule,
    UserModule,
    StatsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, main],
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
