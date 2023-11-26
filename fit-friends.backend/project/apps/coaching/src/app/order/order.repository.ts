import { Injectable } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {OrderInterface} from '@project/shared-types';
import {
  makeQueryFilterOrders,
  makeQueryFilterOrdersCount
} from '@project/helpers';
import {OrderEntity} from './order.entity';
import {OrderFilterDto} from '@project/shared-dto';
import {
  makeQueryPurchases,
  makeQueryPurchasesCount
} from "../../../../../libs/shared/helpers/src/lib/make-query-purchases";

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
    const queryString = makeQueryFilterOrders(queryFilters);
    const orders: OrderInterface[] = await this.prisma.$queryRawUnsafe(queryString);
    return orders.map((order) =>
      ({...order, total: Number(order.total), count: Number(order.count)}));
  }

  public async count(queryFilters: OrderFilterDto) {
    const queryString = makeQueryFilterOrdersCount(queryFilters);
    return Number((await this.prisma.$queryRawUnsafe(queryString))[0].count);
  }

  public async purchases(userId: string, limit: number, page: number, isActive: boolean) {
    const queryString = makeQueryPurchases(userId, limit, page, isActive);
    return this.prisma.$queryRawUnsafe(queryString);
  }

  public async purchasesCount(userId: string, isActive: boolean): Promise<number> {
    const queryString = makeQueryPurchasesCount(userId, isActive);
    return (await this.prisma.$queryRawUnsafe(queryString))[0].count;
  }
}
