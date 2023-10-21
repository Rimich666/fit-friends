import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {FileModel} from '@project/uploader.model';
import {FileEntity} from './file.entity';
import {FileInterface} from '@project/shared-types';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(FileModel.name) private readonly fileModel: Model<FileModel>
  ) {}

  public async create(item: FileEntity): Promise<FileInterface> {
    const file = new this.fileModel(item);
    return await file.save();
  }

  public async findById(id: string): Promise<FileInterface | null> {
    return await this.fileModel
      .findOne({_id: id})
      .exec();
  }
}
