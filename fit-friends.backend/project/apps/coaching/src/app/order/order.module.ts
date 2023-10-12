import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import {PrismaModule} from '../prisma/prisma.module';
import {JwtAccessStrategy} from '@project/util-core';
import {TrainingModule} from '../training/training.module';

@Module({
  imports: [PrismaModule, TrainingModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, JwtAccessStrategy],
})
export class OrderModule {}
