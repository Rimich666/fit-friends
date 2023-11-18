import {Inject, Injectable} from '@nestjs/common';
import {CreateUserDto, LoginUserDto} from '@project/shared-dto';
import {Role, UserFilesType} from '@project/shared-types';
import {getBackgroundFile} from '@project/helpers';
import {ControllerPrefix, Static} from '@project/shared-constants';
import {getAuthHeader} from '@project/util-core';
import {HttpService} from '@nestjs/axios';
import {appConfig, appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {BffService} from '../bff.service';
import {FitUsersService} from '../fit-users/fit-users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly bffService: BffService,
    private readonly fitUsersService: FitUsersService,
    @Inject (appConfig.KEY) private readonly applicationConfig: ConfigType<typeof appConfig>
  ) {}

  public async register(dto: CreateUserDto, files: UserFilesType, token: string, url: string) {
    if (files.avatar) {
      const image = await this.bffService.upload(files.avatar[0]);
      dto.avatarId = image.id;
    }
    if (dto.role === Role.coach) {
      if (files.certificate) {
        const promises = files.certificate.map((certificate) =>
          this.bffService.upload(certificate));
        dto.addition['certificateId'] = (await Promise.all(promises)).map((certificate) => certificate.id);
    }}
    const background = (await getBackgroundFile(Static.Endpoint.USER));
    dto.imagePath =
      `http://${Static.HOST}:${this.applicationConfig.port}${Static.SERVE_ROOT}/${Static.Endpoint.USER}/${background}`;
    const {data} = await this.httpService.axiosRef.post(`${url}`, dto, getAuthHeader(token));
    return this.bffService.getUsersPaths(data);
  }

  public async login(dto: LoginUserDto, token: string, url: string) {
    const {data} = await this.httpService.axiosRef.post(`${url}`, dto, getAuthHeader(token));
    const {id, accessToken, refreshToken} = data;
    const usersUrl = `${this.config.users}/${ControllerPrefix.fitUsers}`;
    const user = await this.fitUsersService.getUser(`Bearer ${accessToken}`, `${usersUrl}/${id}`);
    return {user, accessToken, refreshToken};
  }
}
