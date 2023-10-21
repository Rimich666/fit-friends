import { Injectable } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {OrderInterface} from '@project/shared-types';
import {makeOrderCountQueryFilters, makeOrderQueryFilters} from '@project/helpers';
import {OrderEntity} from './order.entity';
import {OrderFilterDto} from '@project/shared-dto';

@Injectable()
export class OrderRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async create(item: OrderEntity): Promise<OrderInterface> {
    const entityData = item.toObject();
    return this.prisma.order.create({
      data: {
        ...entityData
      },
      include: {
        training: true
      }
    });
  }

  public async find(queryFilters: OrderFilterDto): Promise<OrderInterface[]> {
    const queryString = makeOrderQueryFilters(queryFilters);
    const orders: OrderInterface[] = await this.prisma.$queryRawUnsafe(queryString);
    return orders.map((order) =>
      ({...order, total: Number(order.total), count: Number(order.count)}));
  }

  public async count(queryFilters: OrderFilterDto) {
    const queryString = makeOrderCountQueryFilters(queryFilters);
    return Number((await this.prisma.$queryRawUnsafe(queryString))[0].count);
  }
}
