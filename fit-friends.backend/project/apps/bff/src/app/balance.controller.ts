import {Body, Controller, Get, Inject, Param, Patch, Post, UseFilters} from '@nestjs/common';
import {BalanceDto} from '@project/shared-dto';
import {Token} from '@project/shared-enhancers';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {ControllerPrefix} from '@project/shared-constants';
import {getAuthHeader} from '@project/util-core';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {BffService} from './bff.service';

@Controller(ControllerPrefix.balance)
@UseFilters(AxiosExceptionFilter)
export class BalanceController {
  constructor(
    private readonly bffService: BffService,
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private url = `${this.config.coaching}/${ControllerPrefix.balance}`;

  @Post('/')
  public async add(@Body() balance: BalanceDto, @Token() token: string){
    const {data} = await this.httpService.axiosRef.post(`${this.url}`, balance, getAuthHeader(token));
    return data;
  }

  @Patch('/')
  public async sub(@Body() balance: BalanceDto, @Token() token: string){
    const {data} = await this.httpService.axiosRef.patch(`${this.url}`, balance, getAuthHeader(token));
    return data;
  }

  @Get('/')
  public async index(@Token() token: string){
    const {data} = await this.httpService.axiosRef.get(`${this.url}`, getAuthHeader(token));
    return {...data, training: await this.bffService.getTrainingPath(data.training)};
  }

  @Get('/:id')
  public async count(@Param('id') id: string, @Token() token: string){
    const {data} = await this.httpService.axiosRef.get(`${this.url}/${id}`, getAuthHeader(token));
    return data;
  }
}
