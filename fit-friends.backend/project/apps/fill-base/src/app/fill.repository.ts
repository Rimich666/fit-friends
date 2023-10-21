import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Collections} from './collections';
import {FileModel} from '@project/uploader.model';
import {
  BalanceInterface, FeedbackInterface,
  FileInterface,
  FriendsInterface,
  JoinTrainingInterface,
  NotificationInterface, OrderInterface, TrainingInterface,
  UserInterface
} from '@project/shared-types';
import {FitUserModel, FriendsUsersModel, JoinTrainingModel, NotificationModel} from '@project/fit-users.model';
import {Prisma} from '@prisma/client';
import {PrismaService} from './prisma/prisma.service';
import {RefreshTokenModel} from '@project/refresh-token.model';

@Injectable()
export class FillRepository {
  constructor(
    @InjectModel(FitUserModel.name, Collections.users) private  readonly userModel: Model<FitUserModel>,
    @InjectModel(FileModel.name, Collections.files) private readonly fileModel: Model<FileModel>,
    @InjectModel(FriendsUsersModel.name, Collections.users) private readonly friendModel: Model<FriendsUsersModel>,
    @InjectModel(NotificationModel.name, Collections.users) private readonly notificationModel: Model<NotificationModel>,
    @InjectModel(JoinTrainingModel.name, Collections.users) private readonly requestsModel: Model<JoinTrainingModel>,
    @InjectModel(RefreshTokenModel.name, Collections.users) private readonly refreshModel: Model<RefreshTokenModel>,
    private readonly prisma: PrismaService,
  ) {
  }

  public async fileSave(file: FileInterface){
    return this.fileModel.create(file);
  }

  public async insertUsers(users: UserInterface[]) {
    const created = await this.userModel.insertMany(users);
    return created.map((user) => user.id);
  }

  public async dropUsers() {
    await this.userModel.deleteMany();
  }

  public async dropFiles() {
    await this.fileModel.deleteMany();
  }

  public async dropNotifications() {
    await this.notificationModel.deleteMany();
  }

  public async dropFriends() {
    await this.friendModel.deleteMany();
  }

  public async dropRequests() {
    await this.requestsModel.deleteMany();
  }

  public async dropRefresh() {
    await this.friendModel.deleteMany();
  }

  public async insertFriends(friends: FriendsInterface[]) {
    return this.friendModel.insertMany(friends);
  }

  public async findUserById(id: string) {
    return this.userModel.findById(id);
  }

  public async getUserNameById(id: string) {
    return (await this.findUserById(id)).name;
  }

  public async insertNotifications(notifications: NotificationInterface[]) {
    return this.notificationModel.insertMany(notifications);
  }

  public async insertJoinRequests(requests: JoinTrainingInterface[]) {
    return this.requestsModel.insertMany(requests);
  }

  public async insertTrainings(trainings: TrainingInterface[]) {
    await this.prisma.training.createMany({
      data: trainings as Prisma.TrainingCreateManyInput[],
      skipDuplicates: true
    });
    return this.prisma.training.findMany({
      select: {
        id: true,
        price: true
      },
    });
  }

  public async insertOrders(orders: OrderInterface[]) {
    await this.prisma.order.createMany({
      data: orders as Prisma.OrderCreateManyInput[],
      skipDuplicates: true
    });
    return (await this.prisma.order.groupBy({
      by: ['userId', 'trainingId'],
      _sum: {
        count: true,
      },
    })).map((order) => ({
      userId: order.userId,
      trainingId: order.trainingId,
      count: order._sum.count
    }));
  }

  public async insertFeedbacks(feedbacks: FeedbackInterface[]) {
    await this.prisma.feedback.createMany({
      data: feedbacks as Prisma.FeedbackCreateManyInput[],
      skipDuplicates: true
    });
    return (await this.prisma.feedback.groupBy({
      by: ['trainingId'],
      _avg: {
        rating: true,
      },
    })).map((feedback) => ({
      trainingId: feedback.trainingId,
      rating: Math.round(feedback._avg.rating)
    }));
  }

  public async insertBalances(balances: BalanceInterface[]) {
    await this.prisma.balance.createMany({
      data: balances as Prisma.BalanceCreateManyInput[],
      skipDuplicates: true
    });
  }

  private async updateRating(id: number, rating: number) {
    return this.prisma.training.update({
      data: {
        rating
      },
      where: {
        id
      }
    });
  }

  public async setRating(ratings: {trainingId: number, rating: number}[]) {
    return Promise.all(ratings.map((rating) =>
      this.updateRating(rating.trainingId, rating.rating)));
  }


  public async dropTrainings() {
    await this.prisma.feedback.deleteMany({});
    await this.prisma.balance.deleteMany({});
    await this.prisma.order.deleteMany({});
    await this.prisma.training.deleteMany({});
  }

}
