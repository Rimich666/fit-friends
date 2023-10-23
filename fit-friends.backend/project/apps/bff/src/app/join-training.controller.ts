import {Body, Controller, Inject, Patch, Post, UseFilters} from '@nestjs/common';
import {ControllerPrefix} from '@project/shared-constants';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {CreateJoinTrainingDto, UpdateJoinTrainingDto} from '@project/shared-dto';
import {Token} from '@project/shared-enhancers';
import {fillObject, getAuthHeader} from '@project/util-core';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {BffService} from './bff.service';
import {JoinTrainingRdo} from '@project/shared-dto';

@Controller(ControllerPrefix.joinTraining)
@UseFilters(AxiosExceptionFilter)
export class JoinTrainingController {
  constructor(
    private readonly httpService: HttpService,
    private readonly bffService: BffService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private url = `${this.config.users}/${ControllerPrefix.joinTraining}`;

  @Post('/')
  async create(@Body() dto: CreateJoinTrainingDto, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.post(`${this.url}`, dto, getAuthHeader(token));
    return fillObject(JoinTrainingRdo, data);
  }

  @Patch('/')
  async changeStatus(@Body() dto: UpdateJoinTrainingDto, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.patch(`${this.url}`, dto, getAuthHeader(token));
    return fillObject(JoinTrainingRdo, data);
  }
}
