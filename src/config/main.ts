import { registerAs } from '@nestjs/config';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export interface MainConfig {
  appPort: number;
  tokenAddress: string;
  abiAddress: string;
  alchemyApiKey: string;
  arbscanApiKey: string;
  logErrors: boolean;
  logWarns: boolean;
  logInfo: boolean;
  logDebug: boolean;
  logVerbose: boolean;
}

const MAIN_CONFIG: MainConfig = {
  appPort: +process.env.APP_PORT,
  tokenAddress: process.env.CONTRACT_ADDRESS,
  abiAddress: process.env.ABI_CONTRACT_ADDRESS,
  alchemyApiKey: process.env.ARB_MAINNET_ALCHEMY_KEY,
  arbscanApiKey: process.env.ARBSCAN_API_KEY,
  logErrors: process.env.LOG_ERRORS === 'true',
  logWarns: process.env.LOG_WARNS === 'true',
  logInfo: process.env.LOG_INFO === 'true',
  logDebug: process.env.LOG_DEBUG === 'true',
  logVerbose: process.env.LOG_VERBOSE === 'true',
};

export default registerAs('main', () => MAIN_CONFIG);
