import {
  Body,
  Controller, Get,
  Inject,
  Param, ParseFilePipe,
  Patch,
  Post, Response, UploadedFile, UseFilters, UseInterceptors,
} from '@nestjs/common';
import {ControllerPrefix, EndPoints} from '@project/shared-constants';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {FileTypeValidator, JsonPipe, Origin, QueryRaw, Token} from '@project/shared-enhancers';
import {
  CreateTrainingDto, TrainingEndRdo,
  UpdateTrainingDto
} from '@project/shared-dto';
import {fillObject, getAuthHeader} from '@project/util-core';
import {Response as Res} from 'express';
import {TrainingService} from './training.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {BffService} from '../bff.service';
import {AxiosExceptionFilter} from '../filters/axios-exception.filter';

@Controller(ControllerPrefix.training)
@UseFilters(AxiosExceptionFilter)
export class TrainingController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly trainingService: TrainingService,
    private readonly bffService: BffService
  ) {}

  private url = `${this.config.coaching}/${ControllerPrefix.training}`;

  @Post('/')
  @UseInterceptors(FileInterceptor('video'))
  async create(
    @UploadedFile(new ParseFilePipe({
      validators: [new FileTypeValidator({types: ['avi', 'mov', 'mp4']})]})) file: Express.Multer.File,
    @Token() token: string,
    @Body('training', JsonPipe) dto: CreateTrainingDto,
    @Origin() origin: string) {

    return this.trainingService.create(token, dto, origin, file,`${this.url}`);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('video'))
  async update(
    @UploadedFile(new ParseFilePipe({
      validators: [new FileTypeValidator({types: ['avi', 'mov', 'mp4']})],
      fileIsRequired: false
    })) file: Express.Multer.File,
    @Param('id') id: string,
    @Body('training', JsonPipe) dto: UpdateTrainingDto, @Token() token: string) {

    return this.trainingService.update(token, dto, file,`${this.url}/${id}`);
  }

  @Get(`/${EndPoints.coach}`)
  async list(@QueryRaw() filters: string, @Token() token: string, @Response() response: Res) {
    return this.trainingService.list(token,`${this.url}/${EndPoints.coach}${filters}`, response);
  }

  @Get('/:id')
  async show(@Param('id') trainingId: string, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.get(`${this.url}/${trainingId}`, getAuthHeader(token));
    return {...fillObject(TrainingEndRdo,
        {...await this.bffService.getTrainingPath(data)}),
      coach: (await this.bffService.getUser(data.coachId, token))};
  }

  @Get('/')
  async index(@QueryRaw() filters: string, @Token() token: string, @Response() response: Res) {
    return this.trainingService.list(token,`${this.url}${filters}`, response);
  }
}
