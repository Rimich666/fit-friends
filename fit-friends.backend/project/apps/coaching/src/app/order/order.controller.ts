import {Body, Controller, Get, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe} from '@nestjs/common';
import {CoachOnlyGuard, JwtAuthGuard, User, UserOnlyGuard} from '@project/shared-enhancers';
import {OrderService} from './order.service';
import {TokenPayloadInterface} from '@project/shared-types';
import {CreateOrderDto, OrderFilterDto} from '@project/shared-dto';
import {fillObject} from '@project/util-core';
import {OrderInterceptor} from './order.interceptor';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post('/')
  @UseGuards(UserOnlyGuard)
  @UseInterceptors(OrderInterceptor)
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@User() {userId}: TokenPayloadInterface, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder({...dto, userId});
    // return fillObject(OrderRdo, newOrder);
  }

  @UseGuards(CoachOnlyGuard)
  @Get('/')
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  async list(@Query() filters: OrderFilterDto, @User() {userId}) {
    return this.orderService.getOrders({...filters, coachId: userId});
    // return fillObject(OrderRdo, trainings);
  }
}
