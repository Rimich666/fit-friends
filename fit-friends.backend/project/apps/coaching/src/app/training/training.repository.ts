import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {TrainingEntity} from './training.entity';
import {Order, TrainingInterface} from '@project/shared-types';
import {makeTrainingQueryFilters, QueryFilter} from '@project/helpers';
import {Prisma} from '@prisma/client';
import {ForYouFilterDto} from "@project/shared-dto";
import {makeQueryFilterForUou} from "../../../../../libs/shared/helpers/src/lib/make-query-filter-for-uou";

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

  public async getForYou(filters: ForYouFilterDto): Promise<TrainingInterface[]> {
    const queryString = makeQueryFilterForUou(filters);
    return this.prisma.$queryRawUnsafe(queryString);
  }

  public async getPopular(limit: number) {
    return this.prisma.training.findMany({
      orderBy: {rating: Order.desc},
      take: limit
    });
  }

  public async getSpecial(limit: number) {
    return this.prisma.training.findMany({
      where: {
        isSpecialOffer: true
      },
      take: limit,
      orderBy: {createDate: Order.desc},
    });
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

  public async count(queryFilters: QueryFilter) {
    const filters = makeTrainingQueryFilters(queryFilters);
    return this.prisma.training.count({where: filters.where});
  }

  public async maxPrice(coachID?: string) {
    const args: Prisma.TrainingAggregateArgs = {
      _max: {
        price: true,
      },
    };
    if (coachID) {
      args.where = {
        coachId: coachID
      };
    }

    const aggregations = await this.prisma.training.aggregate(args);
      return aggregations._max.price;
  }
}
