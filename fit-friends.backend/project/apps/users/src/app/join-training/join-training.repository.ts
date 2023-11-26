import { Injectable } from '@nestjs/common';
import {JoinTrainingEntity} from './join-training.entity';
import {InjectModel} from '@nestjs/mongoose';
import {JoinTrainingModel} from '@project/fit-users.model';
import {Model} from 'mongoose';
import {RequestState} from "@project/shared-types";

@Injectable()
export class JoinTrainingRepository {
  constructor(
    @InjectModel(JoinTrainingModel.name) private readonly joinTrainingModel: Model<JoinTrainingModel>) {
  }

  public async findById(requestId: string) {
    return this.joinTrainingModel.findById(requestId);
  }

  public async create(entity: JoinTrainingEntity) {
    return this.joinTrainingModel.create(entity);
  }

  public async update(entity: JoinTrainingEntity) {
    const updated = await this.joinTrainingModel.findByIdAndUpdate(entity.id, entity);
    return this.findById(updated.id);
  }

  public async getConsideration(id: string) {
    return this.joinTrainingModel.find({id: id, state: RequestState.consideration});
  }
}
