import {
  Controller, Delete,
  Inject, Param,
  ParseFilePipe, Patch,
  Post, UploadedFile,
  UploadedFiles, UseFilters,
  UseInterceptors
} from '@nestjs/common';
import {ControllerPrefix, EndPoints} from '@project/shared-constants';
import {HttpService} from '@nestjs/axios';
import {BffService} from './bff.service';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {FileTypeValidator, Token} from '@project/shared-enhancers';
import {getAuthHeader} from '@project/util-core';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';

@Controller(ControllerPrefix.certificates)
@UseFilters(AxiosExceptionFilter)
export class CertificatesController {
  constructor(
    private readonly httpService: HttpService,
    private readonly bffService: BffService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private url = `${this.config.users}/${ControllerPrefix.fitUsers}`;

  @Post('/')
  @UseInterceptors(
    FilesInterceptor('certificate'),
  )
  async add(
    @UploadedFiles(new ParseFilePipe({
      validators: [new FileTypeValidator(
        {types: ['pdf']},
      )],
      fileIsRequired: true
    })) files: Express.Multer.File[], @Token() token: string) {
    const certificates = await this.bffService.uploads(files);
    await this.httpService.axiosRef.post(
      `${this.url}/${EndPoints.certificates}`,
      certificates.map((certificate) => certificate.id), getAuthHeader(token));
    return certificates.map((certificate) =>
      ({id: certificate.id, path: certificate.path}));
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.delete(`${this.url}/${EndPoints.certificates}/${id}`,
      getAuthHeader(token));
    const user = await this.bffService.getUsersPaths(data);
    return user.addition['certificatePath'];
  }

  @Patch('/:id')
  @UseInterceptors(
    FileInterceptor('certificate'),
  )
  async change(
    @UploadedFile(new ParseFilePipe({
      validators: [new FileTypeValidator(
        {types: ['pdf']},
      )],
      fileIsRequired: true
    })) file: Express.Multer.File, @Param('id') id: string, @Token() token: string) {
    const certificate = await this.bffService.upload(file);
    const {data} = await this.httpService.axiosRef.patch(`${this.url}/${EndPoints.certificates}/${id}`,
      [certificate.id], getAuthHeader(token));
    const user = await this.bffService.getUsersPaths(data);
    return user.addition['certificatePath'];
  }
}
