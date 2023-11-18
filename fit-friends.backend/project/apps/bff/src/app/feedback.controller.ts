import {
  Body,
  Controller,
  Get,
  Inject, Param,
  Post,
  Response, UseFilters
} from '@nestjs/common';
import {ControllerPrefix, EndPoints} from '@project/shared-constants';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {Token} from '@project/shared-enhancers';
import {CreateFeedbackDto} from '@project/shared-dto';
import {getAuthHeader} from '@project/util-core';
import { Response as Res } from 'express';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {BffService} from './bff.service';


@Controller(ControllerPrefix.feedback)
@UseFilters(AxiosExceptionFilter)
export class FeedbackController {
  constructor(
    private readonly bffService: BffService,
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private url = `${this.config.coaching}/${ControllerPrefix.feedback}`;

  @Post('/')
  async create(@Body() dto: CreateFeedbackDto, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.post(`${this.url}`, dto, getAuthHeader(token));
    return {...data, training: await this.bffService.getTrainingPath(data.training)};
  }

  @Get('/:id')
  async index(@Param('id') filters: string, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.get(`${this.url}/${filters}`, getAuthHeader(token));
    return this.bffService.getAuthors(data, token);
  }

  @Get(`/:id/${EndPoints.rating}`)
  async rating(@Param('id') trainingId: string, @Token() token: string, @Response() response: Res) {
    const {data, headers} =
      await this.httpService.axiosRef.get(`${this.url}/${trainingId}/${EndPoints.rating}`, getAuthHeader(token));
    return response.set({ 'List-Size': headers['list-size']}).json(data);
  }
}
