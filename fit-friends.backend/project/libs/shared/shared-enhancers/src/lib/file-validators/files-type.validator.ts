import {FileValidator, Injectable} from '@nestjs/common';
import {IFile} from '@nestjs/common/pipes/file/interfaces';
import {validators} from './validators';

@Injectable()
export class FilesTypeValidator extends FileValidator {
  buildErrorMessage(files: {[f: string]: Express.Multer.File[]}): string {
    const errorText = {
      image: 'jpeg or png',
      pdf: 'pdf'
    };
    return Object.values(files).reduce((acc, arr) =>
      acc.concat(arr), []).filter((file) => file['isError']).map((file) =>
      `${file.fieldname} '${file.originalname}' is not a ${errorText[this.validationOptions[file.fieldname]]}.`).join('\n');
  }

  isValid(files: {[f: string]: Express.Multer.File[] | IFile[]}): boolean | Promise<boolean> {
    return  Object.keys(files).map((key) => files[key] ? files[key].map(
      (file: Express.Multer.File) => validators[this.validationOptions[key]](file)).
    reduce((acc, res) => acc && res, true) : true).reduce((acc, res) => acc && res, true);
  }
}
