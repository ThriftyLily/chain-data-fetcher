import { Inject, Injectable, Logger } from '@nestjs/common';
import Web3, { EventLog } from 'web3';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { getABI, getContract, getCurrentBlockNumber } from 'src/utils';
import { BlocktrackerService } from '../tokenData/services/blockTracker.service';
import { TokenEventService } from '../tokenData/services/tokenEvent.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class TasksService {
  constructor(
    private configService: ConfigService,
    private readonly loggerService: LoggerService,
    @Inject(BlocktrackerService)
    private readonly blockTrackerService: BlocktrackerService,
    @Inject(TokenEventService)
    private readonly tokenEventService: TokenEventService,
  ) {}

  private arbitratyBlockNumberToLookForward = 1000; // no bigger than 10k bcs api limitation, best range between 500 - 700 for histroical data mining

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleTask() {
    this.loggerService.log(new Date().toISOString(), 'Start processing');

    const alchemyApiKey = this.configService.get<string>('alchemyApiKey');
    const arbscanApiKey = this.configService.get<string>('arbscanApiKey');
    const tokenAddress = this.configService.get<string>('tokenAddress');
    const abiAddress = this.configService.get<string>('abiAddress');

    const abi = await getABI(abiAddress, arbscanApiKey);
    const tokenContract = await getContract(tokenAddress, abi, alchemyApiKey);

    const { id: blockId, block: fromBlock } =
      await this.blockTrackerService.getLastBlock();

    const toBlock = fromBlock + this.arbitratyBlockNumberToLookForward;

    const events = await tokenContract.getPastEvents('Transfer', {
      fromBlock,
      toBlock,
    });

    if (events.length === 0) {
      const latestBlock = await getCurrentBlockNumber(alchemyApiKey);

      const newBlockTracker = toBlock > latestBlock ? latestBlock : toBlock;

      await this.blockTrackerService.updateBlock(blockId, newBlockTracker);

      this.loggerService.log(new Date().toISOString(), 'End processing');

      return;
    }

    let blockNumber = fromBlock;

    const eventsData = events.map((event: EventLog) => {
      blockNumber =
        blockNumber > Number(event.blockNumber)
          ? blockNumber
          : Number(event.blockNumber);

      return {
        txHash: event.transactionHash,
        block: event.blockNumber,
        actionType: event.event,
        from: event.returnValues.from,
        logIndex: event.logIndex,
        eventId: Web3.utils.sha3(`F${event.transactionHash + event.logIndex}`), // Press F to pay respects
      };
    });

    await this.tokenEventService.saveMany(eventsData);

    await this.blockTrackerService.updateBlock(blockId, blockNumber);

    this.loggerService.log(new Date().toISOString(), 'End processing');
  }
}
