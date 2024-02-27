import { Module } from '@nestjs/common';
import { StatsController } from './controllers/stats.controller';
@Module({
  imports: [],
  controllers: [StatsController],
  providers: [],
  exports: [],
})
export class StatsModule {}
