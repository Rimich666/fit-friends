import {Body, Controller, Delete, Inject, Param, Post, UseFilters, UseGuards} from '@nestjs/common';
import {SubscribeDto, SubscriberRdo} from '@project/shared-dto';
import {Token} from '@project/shared-enhancers';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {NotCoachGuard} from './guards/not-coach.guard';
import {fillObject, getAuthHeader} from '@project/util-core';
import {ControllerPrefix} from '@project/shared-constants';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';

@Controller(ControllerPrefix.emailSubscriber)
@UseFilters(AxiosExceptionFilter)
export class EmailSubscriberController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private url = `${this.config.notify}/${ControllerPrefix.emailSubscriber}`;

  @Post('/')
  @UseGuards(NotCoachGuard)
  async create(@Body() dto: SubscribeDto, @Token() token: string) {
    const {data} =
      await this.httpService.axiosRef.post(`${this.url}/`, dto, getAuthHeader(token));
    return fillObject(SubscriberRdo, data);
  }

  @Delete('/:id')
  async delete(@Param('id') coachId: string, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.delete(`${this.url}/${coachId}`,getAuthHeader(token));
    return fillObject(SubscriberRdo, data);
  }
}
