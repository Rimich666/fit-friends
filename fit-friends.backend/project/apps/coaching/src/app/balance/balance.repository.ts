import { Injectable } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {BalanceInterface} from '@project/shared-types';
import {BalanceEntity} from './balance.entity';

@Injectable()
export class BalanceRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async find(balance: BalanceInterface) {
    return this.prisma.balance.findFirst({
      where: {
        userId: balance.userId,
        trainingId: balance.trainingId
      },
      include: {
        training: true
      }
    });
  }

  public async change(balance: BalanceInterface) {
    return this.prisma.balance.update({
      where: {
        id: balance.id
      },
      data: {
        count: balance.count
      },
      include: {
        training: true
      }
    });
  }

  public async create(balance: BalanceEntity) {
    return this.prisma.balance.create(
      {
        data: balance,
        include: {
          training: true
        }
      }
    );
  }


  public async delete(id: number) {
    return this.prisma.balance.delete({
      where: {
        id: id
      },
      include: {
        training: true
      }
    });
  }

  public async findMany(userId: string) {
    return this.prisma.balance.findMany({
      where: {
        userId: userId
      },
      include: {
        training: true
      }
    });
  }

  public async getCount(userId: string, trainingId: number) {
    const balance = await this.prisma.balance.findFirst({
      where: {
        userId: userId,
        trainingId: trainingId
      },});
    return balance ? balance.count : 0;
  }
}
