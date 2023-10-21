import {Body, Controller, Get, Patch, Post, UseGuards} from '@nestjs/common';
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
    return this.balanceService.add({...balance, userId});
  }

  @Patch('/')
  @UseGuards(BalanceGuard)
  public async sub(@Body() balance: BalanceDto, @User() {userId}){
    return this.balanceService.sub({...balance, userId});
  }

  @Get('/')
  public async index(@User() {userId}){
    return this.balanceService.getBalance(userId);
  }
}
