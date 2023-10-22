import {
  Body,
  Controller,
  Delete,
  Inject, ParseFilePipe,
  Post, UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {ControllerPrefix} from '@project/shared-constants';
import {
  Token,
  UserCreateInterceptor
} from '@project/shared-enhancers';
import {CreateUserDto, LoginUserDto} from '@project/shared-dto';
import {AxiosExceptionFilter} from '../filters/axios-exception.filter';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {EndPoints} from '@project/shared-constants';
import {getAuthHeader} from '@project/util-core';
import {FilesTypeValidator} from '@project/shared-enhancers';
import {UserFilesType} from '@project/shared-types';
import {AuthenticationService} from './authentication.service';

@Controller(ControllerPrefix.authentication)
@UseFilters(AxiosExceptionFilter)
export class AuthenticationController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly authService: AuthenticationService
  ) {}

  private url = `${this.config.users}/${ControllerPrefix.authentication}`;

  @Post(EndPoints.register)
  @UseInterceptors(
    FileFieldsInterceptor([{name: 'avatar', maxCount: 1},{name: 'certificate', maxCount: 1}]),
    UserCreateInterceptor
  )
  public async register(
    @UploadedFiles(new ParseFilePipe({
      validators: [new FilesTypeValidator({
        avatar: 'image',
        certificate: 'pdf'
      })],
      fileIsRequired: false
    })) files: UserFilesType,
    @Body() dto: CreateUserDto,
    @Token() token: string){
    return this.authService.register(dto, files, token, `${this.url}${EndPoints.register}`);
  }

  @Post(EndPoints.login)
  public async login(@Token() token: string, @Body() dto: LoginUserDto){
    return this.authService.login(dto, token, `${this.url}${EndPoints.login}`);
  }

  @Post(EndPoints.refresh)
  public async refreshToken(@Token() token: string) {
    const {data} = await this.httpService.axiosRef.post(`${this.url}${EndPoints.refresh}`,{} ,getAuthHeader(token));
    return data;
  }

  @Delete(EndPoints.refresh)
  public async dropToken(@Token() token: string){
    const {data} = await this.httpService.axiosRef.delete(`${this.url}${EndPoints.refresh}`, getAuthHeader(token));
    return  data;
  }
}
