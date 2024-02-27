import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async getUserByAddress(address: string): Promise<User | null> {
    const repository = this.dataSource.getRepository(User);

    return await repository
      .createQueryBuilder('user')
      .select()
      .where('address = :address', { address })
      .getOne();
  }

  async createUser(address: string): Promise<void> {
    const repository = this.dataSource.getRepository(User);

    await repository
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values({ address, currentPoints: 0 })
      .execute();
  }
}
