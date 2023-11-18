import {Injectable} from '@nestjs/common';
import {BalanceRepository} from './balance.repository';
import {BalanceInterface} from '@project/shared-types';
import {BalanceEntity} from './balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    private balanceRepository: BalanceRepository,
  ) {}
  public async checkBalance(balance: BalanceInterface) {
    return await this.balanceRepository.find(balance) !== null;
  }

  public async add(balance: BalanceInterface) {
    const found = await this.balanceRepository.find(balance);
    return found ?
      this.balanceRepository.change({...found, count: found.count + balance.count}) :
      this.balanceRepository.create(new BalanceEntity(balance));
  }

  public async sub(balance: BalanceInterface){
    const found = await this.balanceRepository.find(balance);
    const count = found.count - balance.count;
    return count > 0 ?
      await this.balanceRepository.change({...found, count: count}) :
      await this.balanceRepository.delete(found.id);
  }

  public async getBalance(userId: string) {
    return this.balanceRepository.findMany(userId);
  }

  public async getTrainingBalance(userId: string, trainingId: number) {
    return this.balanceRepository.getCount(userId, trainingId);
  }
}
