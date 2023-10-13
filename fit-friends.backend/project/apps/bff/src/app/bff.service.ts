import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {ControllerPrefix} from '@project/shared-constants';

@Injectable()
export class BffService {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  public async isCoach(id: string) {
    const url = `${this.config.users}/${ControllerPrefix.fitUsers}/${id}/isCoach`;
    const {data} = await this.httpService.axiosRef.get(url);
    return !!data;
  }
}
