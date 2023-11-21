import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {BalanceService} from './balance.service';
import {BalanceDto} from '@project/shared-dto';
import {JwtAuthGuard, User, UserOnlyGuard} from '@project/shared-enhancers';
import {ControllerPrefix} from '@project/shared-constants';
import {BalanceGuard} from './balance.guard';

@Controller(ControllerPrefix.balance)
@UseGuards(JwtAuthGuard, UserOnlyGuard)
export class BalanceController {
  constructor(
    private balanceService: BalanceService,
  ) {}

  @Post('/')
  @UseGuards(BalanceGuard)
  public async add(@Body() balance: BalanceDto, @User() {userId}){
    return (await this.balanceService.add({...balance, userId})).count;
  }

  @Patch('/')
  @UseGuards(BalanceGuard)
  public async sub(@Body() balance: BalanceDto, @User() {userId}){
    return (await this.balanceService.sub({...balance, userId})).count;
  }

  @Get('/')
  public async index(@User() {userId}){
    return this.balanceService.getBalance(userId);
  }

  @Get('/:id')
  public async count(@Param('id', ParseIntPipe) id: number, @User() {userId}){
     return this.balanceService.getTrainingBalance(userId, id);
  }
}
