import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stats')
@Controller({ version: '1', path: 'stats' })
export class StatsController {
  @HttpCode(200)
  @Get('/tvl-chart-data')
  async getTvlChartData() {
    return {
      totalValueLocked: {
        eth: '12',
        usd: '34',
      },
      data: [
        { eth: '1', usd: '123' },
        { eth: '2', usd: '456' },
      ],
    };
  }

  @HttpCode(200)
  @Get('/staking-data')
  async getCurrentStakingStats() {
    return {
      apy: '3.21',
      booster: '8.2',
    };
  }
}
