import {Inject, Injectable, Response} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appConfig, appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {BffService} from '../bff.service';
import {CreateTrainingDto, TrainingEndRdo, UpdateTrainingDto, UserRdo} from '@project/shared-dto';
import {ControllerPrefix, Static} from '@project/shared-constants';
import {getBackgroundFile} from '@project/helpers';
import {fillObject, getAuthHeader} from '@project/util-core';
import {Response as Res} from 'express';
import {SportsmanAddition, UserInterface} from '@project/shared-types';

@Injectable()
export class TrainingService {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly bffService: BffService,
    @Inject (appConfig.KEY) private readonly applicationConfig: ConfigType<typeof appConfig>
  ) {}

  private url = `${this.config.coaching}/${ControllerPrefix.training}`;

  public async create(token: string, dto: CreateTrainingDto, origin: string, file: Express.Multer.File, url: string) {
    const background = await getBackgroundFile(Static.Endpoint.TRAINING);
    const video = await this.bffService.upload(file);
    dto.videoId = video.id;
    dto.backgroundPath =
      `http://${Static.HOST}:${this.applicationConfig.port}${Static.SERVE_ROOT}/${Static.Endpoint.TRAINING}/${background}`;

    const {data} = await this.httpService.axiosRef.post(`${url}`, dto, {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      'Origin': origin
    }});
    return fillObject(TrainingEndRdo, {...await this.bffService.getTrainingPath(data)});
  }

  public async update(token: string, dto: UpdateTrainingDto, file: Express.Multer.File,url: string) {
    if (file) {
      const video = await this.bffService.upload(file);
      dto.videoId = video.id;
    }
    const {data} = await this.httpService.axiosRef.patch(url, dto, getAuthHeader(token));
    return fillObject(TrainingEndRdo, {...await this.bffService.getTrainingPath(data)});
  }

  public async list(token: string, url: string, @Response() response: Res) {
    const {data, headers} =
      await this.httpService.axiosRef.get(`${url}`, getAuthHeader(token));
    const trainings = await this.bffService.getTrainings(data);
    return response.set({ 'List-Size': headers['list-size'], 'Max-Price': headers['max-price']}).json(trainings);
  }

  public async getForYou(user: UserInterface, token: string, limit: number) {
    const options = `limit=${limit}&trainingType=${user.trainingType.join(',')}&caloriesCount=${(user
      .addition as SportsmanAddition).trainingCalories}&gender=${user.gender}`;
    const {data} = await this.httpService.axiosRef.get(`${this.url}?${options}`, getAuthHeader(token));
    return this.bffService.getTrainings(data);
  }
}
