import {Controller, Get, Inject, Param, Response, UseFilters} from '@nestjs/common';
import {ControllerPrefix, EndPoints, PurchasesVariant} from '@project/shared-constants';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {QueryRaw, Token} from '@project/shared-enhancers';
import {getAuthHeader} from '@project/util-core';
import {Response as Res} from 'express';
import {BffService} from './bff.service';

@Controller(ControllerPrefix.purchases)
@UseFilters(AxiosExceptionFilter)
export class PurchasesController {
  constructor(
    private readonly httpService: HttpService,
    private readonly bffService: BffService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  @Get('/:variant')
  public async purchases(@Param('variant') variant: PurchasesVariant, @QueryRaw() filters: string,
                         @Token() token: string, @Response() response: Res){
    const url = `${this.config.coaching}/${ControllerPrefix.order}/${EndPoints.purchases}`;
    const {data, headers} =
      await this.httpService.axiosRef.get(`${url}/${variant}${filters}`, getAuthHeader(token));
    return response.set({ 'List-Size': headers['list-size']}).json(data);
  }
}
