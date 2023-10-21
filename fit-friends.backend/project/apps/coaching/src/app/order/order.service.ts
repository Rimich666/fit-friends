import { Injectable } from '@nestjs/common';
import {OrderInterface} from '@project/shared-types';
import {OrderRepository} from './order.repository';
import {OrderEntity} from './order.entity';
import {CreateOrderDto, OrderFilterDto} from '@project/shared-dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}
  public async createOrder(order: CreateOrderDto): Promise<OrderInterface>{
    return this.orderRepository.create(new OrderEntity(order));
  }

  public async getOrders(filters: OrderFilterDto) {
    return this.orderRepository.find(filters);
  }

  public async ordersCount(filters: OrderFilterDto) {
    return this.orderRepository.count(filters);
  }
}
