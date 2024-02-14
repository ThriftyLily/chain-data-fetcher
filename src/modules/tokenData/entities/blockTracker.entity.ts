import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'block_tracker' })
export class BlockTracker extends BaseEntity {
  @Column({ type: 'int' })
  block: number;
}
