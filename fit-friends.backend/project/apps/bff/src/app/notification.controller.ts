import {Controller, Delete, Get, Inject, Param, UseFilters} from '@nestjs/common';
import {ControllerPrefix} from '@project/shared-constants';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {Token} from '@project/shared-enhancers';
import {getAuthHeader} from '@project/util-core';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';

@Controller(ControllerPrefix.notification)
@UseFilters(AxiosExceptionFilter)
export class NotificationController {

  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private url = `${this.config.users}/${ControllerPrefix.notification}`;

  @Delete('/:id')
  async delete(@Param('id') idNotification: string, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.delete(`${this.url}/${idNotification}`, getAuthHeader(token));
    return data;
  }

  @Get('/')
  async index(@Token() token: string) {
    const {data} = await this.httpService.axiosRef.get(`${this.url}`, getAuthHeader(token));
    return data;
  }
}
