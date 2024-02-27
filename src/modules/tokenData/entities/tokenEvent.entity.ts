import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'token_event' })
export class TokenEvent extends BaseEntity {
  @Column({ type: 'varchar', length: 42 })
  from: string;

  @Column({ type: 'varchar', length: 42 })
  to: string;

  @Column({ type: 'bigint' })
  value: number;

  @Column({ type: 'varchar' })
  txHash: string;

  @Column({ type: 'int' })
  block: number;

  @Column({ type: 'varchar', unique: true })
  eventId: string;

  @Column({ type: 'varchar' })
  actionType: string;

  @Column({ type: 'boolean', default: false })
  isCalculated: boolean;
}
