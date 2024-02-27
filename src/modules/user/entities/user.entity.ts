import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 42, unique: true })
  address: string;

  @Column({ type: 'int' })
  currentPoints: number;
}
