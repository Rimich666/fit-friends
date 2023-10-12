import { Injectable } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {TrainingEntity} from './training.entity';
import {TrainingInterface} from '@project/shared-types';
import {makeTrainingQueryFilters, QueryFilter} from '@project/helpers';
import {Prisma} from '@prisma/client';

@Injectable()
export class TrainingRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async create(item: TrainingEntity): Promise<TrainingInterface> {
    const entityData = item.toObject();
    return this.prisma.training.create({
      data: {
        ...entityData
      },
    });
  }

  public async find(queryFilters: QueryFilter): Promise<TrainingInterface[]> {
    const filters = makeTrainingQueryFilters(queryFilters);
    return this.prisma.training.findMany(filters);
  }

  public async findById(id: number): Promise<TrainingInterface> {
    return this.prisma.training.findFirstOrThrow({
      where: {id: id},
    });
  }

  public async findOrNull(id: number): Promise<TrainingInterface | null> {
    return this.prisma.training.findFirst({
      where: {id: id}
    });
  }

  public async update(id: number, item: TrainingEntity): Promise<TrainingInterface> {

    const data: Prisma.TrainingUpdateInput = {
      ...item.toUpdateEntity()
    };
    return this.prisma.training.update(
      {
        where: {id},
        data: data,
      }
    );
  }
}
