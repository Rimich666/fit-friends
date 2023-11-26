import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  UseFilters,
  Response, UseInterceptors, UploadedFiles, ParseFilePipe
} from '@nestjs/common';
import {AxiosExceptionFilter} from '../filters/axios-exception.filter';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {ControllerPrefix, EndPoints} from '@project/shared-constants';
import {UpdateUserDto} from '@project/shared-dto';
import {
  QueryRaw,
  Token,
  FilesTypeValidator,
  UserUpdateInterceptor,
} from '@project/shared-enhancers';
import { Response as Res } from 'express';
import {FitUsersService} from './fit-users.service';
import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {UserFilesType} from '@project/shared-types';
import {getAuthHeader} from '@project/util-core';
import {HttpService} from '@nestjs/axios';
import {BffService} from "../bff.service";

@Controller(ControllerPrefix.fitUsers)
@UseFilters(AxiosExceptionFilter)
export class FitUsersController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly fitUsersService: FitUsersService,
    private readonly bffService: BffService,
  ) {}

  private url = `${this.config.users}/${ControllerPrefix.fitUsers}`;

  @Get('/')
  async index(@Token() token: string, @QueryRaw() filters: string, @Response() response: Res) {
    return this.fitUsersService.getUsers(token, `${this.url}${filters}`, response);
  }

  @Get('/:id')
  async show(@Param('id') userId: string, @Token() token: string) {
    return this.fitUsersService.getUser(token, this.url, userId);
  }

  @Get(`/${EndPoints.self}`)
  async getSelf(@Token() token: string) {
    return this.fitUsersService.getSelf(token);
  }

  @Get(`/${EndPoints.company}/:limit`)
  async getCompany(@Param('limit') limit: string, @Token() token: string) {
    const {data} =
      await this.httpService.axiosRef.get(`${this.url}/${EndPoints.company}/${limit}`, getAuthHeader(token));
    return this.bffService.getUsers(data);
  }

  @Patch('/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{name: 'avatar', maxCount: 1},{name: 'certificate', maxCount: 1}]),
    UserUpdateInterceptor
  )
  async update(
    @UploadedFiles(new ParseFilePipe({
      validators: [new FilesTypeValidator({
        avatar: 'image',
        certificate: 'pdf'
      })],
      fileIsRequired: false
    })) files: UserFilesType, @Param('id') id: string,
    @Body() dto: UpdateUserDto, @Token() token: string) {
    return this.fitUsersService.update(dto, files, token, `${this.url}/${id}`);
  }
}
