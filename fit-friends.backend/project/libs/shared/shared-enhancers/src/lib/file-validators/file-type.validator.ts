import {FileValidator, Injectable} from '@nestjs/common';
import 'multer';
import {IFile} from '@nestjs/common/pipes/file/interfaces';
import {validators} from './validators';

@Injectable()
export class FileTypeValidator extends FileValidator {
  buildErrorMessage(file: any): string {
    const types = this.validationOptions['types'];
    return `File you have is not a ${types.slice(0, -1).join(', ').concat(` or ${types.slice(-1)}`) }`;
  }

  isValid(file: Express.Multer.File | IFile): boolean | Promise<boolean> {
    console.log(this.validationOptions['types']);
    return this.validationOptions['types'].map((type: string) =>
      validators[type](file)).reduce((acc: boolean, res: boolean) => acc || res, false);
  }
}
