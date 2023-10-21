import {
  Body,
  Controller,
  Get,
  Inject,
  Post, Response, UseFilters,
} from '@nestjs/common';
import {ControllerPrefix} from '@project/shared-constants';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {QueryRaw, Token} from '@project/shared-enhancers';
import {CreateOrderDto} from '@project/shared-dto';
import {getAuthHeader} from '@project/util-core';
import {Response as Res} from 'express';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {BffService} from './bff.service';

@Controller(ControllerPrefix.order)
@UseFilters(AxiosExceptionFilter)
export class OrderController {

  constructor(
    private readonly httpService: HttpService,
    private readonly bffService: BffService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private url = `${this.config.coaching}/${ControllerPrefix.order}`;

  @Post('/')
  async create(@Token() token: string, @Body() dto: CreateOrderDto) {
    const {data} = await this.httpService.axiosRef.post(`${this.url}`, dto, getAuthHeader(token));
    return data;
  }

  @Get('/')
  async list(@QueryRaw() filters: string, @Token() token: string, @Response() response: Res) {
    const {data, headers} =
      await this.httpService.axiosRef.get(`${this.url}${filters}`, getAuthHeader(token));
    return response.set({ 'List-Size': headers['list-size']}).json(await this.bffService.getOrders(data));
  }
}
