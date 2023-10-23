import {Body, Controller, Delete, Get, Inject, Param, Post, UseFilters} from '@nestjs/common';
import {ControllerPrefix} from '@project/shared-constants';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {Token} from '@project/shared-enhancers';
import {FriendsDto} from '@project/shared-dto';
import {getAuthHeader} from '@project/util-core';
import {BffService} from './bff.service';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';


@Controller(ControllerPrefix.friends)
@UseFilters(AxiosExceptionFilter)
export class FriendsController {

  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    public readonly bffService: BffService
  ) {}

  private url = `${this.config.users}/${ControllerPrefix.friends}`;

  @Post('/')
  async create(@Body() dto: FriendsDto, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.post(`${this.url}`, dto, getAuthHeader(token));
    return this.bffService.getUsersPaths(data);
  }

  @Delete('/:id')
  async delete(@Param('id') friendId: string, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.delete(`${this.url}/${friendId}`, getAuthHeader(token));
    return this.bffService.getUsersPaths(data);
  }

  @Get('/')
  async index(@Token() token: string) {
    const {data} = await this.httpService.axiosRef.get(`${this.url}`, getAuthHeader(token));
    return this.bffService.getUsers(data);
  }

}
