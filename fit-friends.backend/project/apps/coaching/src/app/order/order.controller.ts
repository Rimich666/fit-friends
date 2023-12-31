import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Response,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {CoachOnlyGuard, JwtAuthGuard, User, UserOnlyGuard} from '@project/shared-enhancers';
import {OrderService} from './order.service';
import {TokenPayloadInterface} from '@project/shared-types';
import {CreateOrderDto, FilterDto, OrderFilterDto, OrderRdo, TrainingSqlRdo} from '@project/shared-dto';
import {OrderInterceptor} from './order.interceptor';
import {ControllerPrefix, EndPoints, PurchasesVariant} from '@project/shared-constants';
import {Response as Res} from 'express';
import {ExistTrainingGuard} from '../exist-training.guard';
import {fillObject} from '@project/util-core';

@Controller(ControllerPrefix.order)
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post('/')
  @UseGuards(UserOnlyGuard, ExistTrainingGuard)
  @UseInterceptors(OrderInterceptor)
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@User() {userId}: TokenPayloadInterface, @Body() dto: CreateOrderDto) {
     return this.orderService.createOrder({...dto, userId});
  }

  @UseGuards(CoachOnlyGuard)
  @Get('/')
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  async list(@Query() query: OrderFilterDto, @User() {userId}, @Response() response: Res) {
    const filters = {...query, coachId: userId};
    const orders = fillObject(OrderRdo, (await this.orderService.getOrders(filters)));
    const count = await this.orderService.ordersCount(filters);
    return response.set({ 'List-Size': count }).json(orders);
  }

  @UseGuards(UserOnlyGuard)
  @Get(`/${EndPoints.purchases}/:variant`)
  async purchases(@Param('variant') variant: PurchasesVariant, @Query() query: FilterDto, @User() {userId},
                  @Response() response: Res) {
    const trainings = fillObject(TrainingSqlRdo,
      (await this.orderService.getPurchases(userId, query.limit, query.page, variant === PurchasesVariant.active)));
    const count =
      await this.orderService.purchasesCount(userId, query.limit, variant === PurchasesVariant.active);
    return response.set({ 'List-Size': count }).json(trainings);
  }
}
