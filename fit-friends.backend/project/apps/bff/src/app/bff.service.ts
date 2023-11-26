import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {ControllerPrefix, EndPoints} from '@project/shared-constants';
import {TrainingEndRdo, UploadedFileRdo} from '@project/shared-dto';
import {CoachAddition, FeedbackInterface, TrainingInterface, UserInterface} from '@project/shared-types';
import {fillObject, getAuthHeader} from '@project/util-core';
import {OrderForCoachInterface} from '@project/shared-types';

@Injectable()
export class BffService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {
  }

  private uploadUrl = `${this.config.files}/${ControllerPrefix.file}`;
  private joinUrl = `${this.config.users}/${ControllerPrefix.joinTraining}`;
  private balanceUrl = `${this.config.coaching}/${ControllerPrefix.balance}`;

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

  public async uploads(files: Express.Multer.File[]): Promise<UploadedFileRdo[]> {
    const form = new FormData();
    files.forEach((file) =>
    {form.append('file', new Blob([file.buffer]), file.originalname);});
    const image = await this.httpService.axiosRef.post(
      `${this.uploadUrl}/uploads`, form, {
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

  private async getCertificate(idFile: string) {
    return {id: idFile, path: await this.getPath(idFile)};
  }

  public async getUser(id: string, token: string) {
    const url = `${this.config.users}/${ControllerPrefix.fitUsers}/${id}`;
    const {data} = await this.httpService.axiosRef.get(url, getAuthHeader(token));
    return this.getUsersPaths(data);
  }

  public async getUsersPaths(data: UserInterface) {
    const {avatarId, ...user} = data;
    if (avatarId) {
      user['avatarPath'] = await this.getPath(avatarId);
    }
    if (data.addition['certificateId']) {
      const {certificateId, ...addition} = data.addition as CoachAddition;
      const certificates = Array.isArray(certificateId) ? certificateId : [certificateId];
      const promises = certificates.map((certificate) =>
        this.getCertificate(certificate));
      addition['certificatePath'] = await Promise.all(promises);
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

  public async getRequesters(users: UserInterface[], token: string) {
    const {data} = await this.httpService.axiosRef.get(this.joinUrl, getAuthHeader(token));
    return (await this.getUsers(users)).map((user) => {
      const request = data.find((item: {requesterId: string, id: string}) => item.requesterId === user.id);
      return {...user, isRequest: !!request, idRequest: request ? request.id : ''};
    });
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

  public async getAuthor(data: FeedbackInterface, token: string) {
    return {...data, author: await this.getUser(data.authorId, token)};
  }

  public async getAuthors(data: FeedbackInterface[], token: string) {
    const promises = data.map((feedback) => this.getAuthor(feedback, token));
    return Promise.all(promises);
  }

  public async getRating(trainingId: string, token: string) {
    const url = `${this.config.coaching}/${ControllerPrefix.feedback}`;
    const {data} =
      await this.httpService.axiosRef.get(`${url}/${trainingId}/${EndPoints.rating}`, getAuthHeader(token));
    return Math.round(data);
  }

  public async isFriend(userId: string, token: string) {
    const url = `${this.config.users}/${ControllerPrefix.friends}/${userId}`;
    const {data} = await this.httpService.axiosRef.get(url, getAuthHeader(token));
    return data;
  }

  public async addBalance(trainingId: number, count: number, token: string) {
    const {data} = await this.httpService.axiosRef.post(this.balanceUrl, {trainingId, count},getAuthHeader(token));
    return data;
  }
}
