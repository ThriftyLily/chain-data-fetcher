import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TokenEvent } from '../entities/tokenEvent.entity';

@Injectable()
export class TokenEventService {
  constructor(private dataSource: DataSource) {}

  async saveMany(tokenEvents: any[]): Promise<void> {
    const repository = this.dataSource.getRepository(TokenEvent);

    await repository
      .createQueryBuilder('tokenEvent')
      .insert()
      .into(TokenEvent)
      .values(tokenEvents)
      .orIgnore() // TODO: check if this will not provide for big fuck ups in the furture
      .execute();
  }

  async getOldestEvet(): Promise<TokenEvent> {
    const repository = this.dataSource.getRepository(TokenEvent);

    return repository
      .createQueryBuilder('tokenEvent')
      .select()
      .orderBy('tokenEvent.createdAt', 'ASC')
      .where('tokenEvent.isCalculated = :isCalculated', { isCalculated: false })
      .getOne();
  }
}
