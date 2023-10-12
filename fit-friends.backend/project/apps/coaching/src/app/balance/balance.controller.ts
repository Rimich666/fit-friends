import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {BalanceService} from './balance.service';
import {BalanceDto} from '@project/shared-dto';
import {JwtAuthGuard, User, UserOnlyGuard} from '@project/shared-enhancers';

@Controller('balance')
@UseGuards(JwtAuthGuard, UserOnlyGuard)
export class BalanceController {
  constructor(
    private balanceService: BalanceService,
  ) {}

  @Post('/')
  public async add(@Body() balance: BalanceDto, @User() {userId}){
    return this.balanceService.add({...balance, userId});
  }

  @Delete('/')
  public async sub(@Body() balance: BalanceDto, @User() {userId}){
    return this.balanceService.sub({...balance, userId});
  }

  @Get('/')
  public async index(@User() {userId}){
    return this.balanceService.getBalance(userId);
  }
}
