import {Inject, Injectable} from '@nestjs/common';
import {CreateUserDto, LoginUserDto} from '@project/shared-dto';
import {Role, UserFilesType} from '@project/shared-types';
import {getBackgroundFile} from '@project/helpers';
import {Static} from '@project/shared-constants';
import {fillObject, getAuthHeader} from '@project/util-core';
import {HttpService} from '@nestjs/axios';
import {appConfig, appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {BffService} from '../bff.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly bffService: BffService,
    @Inject (appConfig.KEY) private readonly applicationConfig: ConfigType<typeof appConfig>
  ) {}

  public async register(dto: CreateUserDto, files: UserFilesType, token: string, url: string) {
    if (files.avatar) {
      const image = await this.bffService.upload(files.avatar[0]);
      dto.avatarId = image.id;
    }
    if (dto.role === Role.coach) {
      if (files.certificate) {
        const certificate = await this.bffService.upload(files.certificate[0]);
        dto.addition['certificateId'] = certificate.id;
    }}
    const background = (await getBackgroundFile(Static.Endpoint.USER));
    dto.imagePath =
      `http://${Static.HOST}:${this.applicationConfig.port}${Static.SERVE_ROOT}/${Static.Endpoint.USER}/${background}`;
    const {data} = await this.httpService.axiosRef.post(`${url}`, dto, getAuthHeader(token));
    return this.bffService.getUsersPaths(data);
  }

  public async login(dto: LoginUserDto, token: string, url: string) {
    const {data} = await this.httpService.axiosRef.post(`${url}`, dto, getAuthHeader(token));
    return data;
  }
}
