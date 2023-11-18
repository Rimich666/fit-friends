import {Injectable, Response} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {BffService} from '../bff.service';
import {UpdateUserDto} from '@project/shared-dto';
import {getAuthHeader} from '@project/util-core';
import { Response as Res } from 'express';
import {UserFilesType} from '@project/shared-types';

@Injectable()
export class FitUsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly bffService: BffService,
  ) {
  }

  public async getUsers(token: string, url: string, @Response() response: Res) {
    const {data, headers} =
      await this.httpService.axiosRef.get(`${url}`, getAuthHeader(token));
    const users = await this.bffService.getUsers(data);
    return response.set({ 'List-Size': headers['list-size']}).json(users);
  }

  public async getUser(token: string, url: string) {
    const {data} = await this.httpService.axiosRef.get(`${url}`, getAuthHeader(token));
    return this.bffService.getUsersPaths(data);
  }

  public async getSelf(token: string, url: string) {
    const {data} = await this.httpService.axiosRef.get(`${url}`, getAuthHeader(token));
    return this.bffService.getUsersPaths(data);
  }

  public async update(dto: UpdateUserDto, files: UserFilesType, token: string, url: string) {
    if (files.avatar) {
      const image = await this.bffService.upload(files.avatar[0]);
      dto.avatarId = image.id;
    }
    if (files.certificate) {
      const certificate = await this.bffService.upload(files.certificate[0]);
      dto.addition['certificateId'] = certificate.id;
    }
    const {data} = await this.httpService.axiosRef.patch(`${url}`, dto, getAuthHeader(token));

    return this.bffService.getUsersPaths(data);
  }
}
