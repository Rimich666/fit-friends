import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {ControllerPrefix} from '@project/shared-constants';
import {TrainingEndRdo, UploadedFileRdo} from '@project/shared-dto';
import {CoachAddition, TrainingInterface, UserInterface} from '@project/shared-types';
import {fillObject} from '@project/util-core';
import {OrderForCoachInterface} from '@project/shared-types';

@Injectable()
export class BffService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {
  }

  private uploadUrl = `${this.config.files}/${ControllerPrefix.file}`;

  public async isCoach(id: string) {
    const url = `${this.config.users}/${ControllerPrefix.fitUsers}/${id}/isCoach`;
    const {data} = await this.httpService.axiosRef.get(url);
    return !!data;
  }

  public async upload(file: Express.Multer.File): Promise<UploadedFileRdo> {
    const form = new FormData();
    form.append('file', new Blob([file.buffer]), file.originalname);
    const image = await this.httpService.axiosRef.post(
      `${this.uploadUrl}/upload`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return image.data;
  }

  public async getPath(idFile: string) {
    const file = await this.httpService.axiosRef.get(`${this.uploadUrl}/${idFile}`);
    return file.data.path;
  }

  public async getUsersPaths(data: UserInterface) {
    const {avatarId, ...user} = data;
    if (avatarId) {
      user['avatarPath'] = await this.getPath(avatarId);
    }
    if (data.addition['certificateId']) {
      const {certificateId, ...addition} = data.addition as CoachAddition;
      addition['certificatePath'] = await this.getPath(certificateId);
      user.addition = addition;
    }
    return user;
  }

  public async getTrainingPath(data: TrainingInterface) {
    const {videoId, ...training} = data;
    training.videoPath = await this.getPath(videoId);
    return training;
  }

  public async getUsers(data: UserInterface[]) {
    const promises = data.map((item: UserInterface) => this.getUsersPaths(item));
    return Promise.all(promises);
  }

  public async getTrainings(data: TrainingInterface[]) {
    const promises = data.map((item: TrainingInterface) => this.getTrainingPath(item));
    return fillObject(TrainingEndRdo, (await Promise.all(promises)));
  }

  public async getOrderPath(data: OrderForCoachInterface) {
    const {videoId, ...order} = data;
    order.videoPath = await this.getPath(videoId);
    return order;
  }

  public async getOrders(data: OrderForCoachInterface[]) {
    return Promise.all(data.map((item: OrderForCoachInterface) => this.getOrderPath(item)));
  }
}
