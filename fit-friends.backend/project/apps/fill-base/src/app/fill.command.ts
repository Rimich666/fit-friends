import {Command, CommandRunner} from 'nest-commander';
import {Logger} from '@nestjs/common';
import {Generator} from './generators';
import {generateRandomValue, getRandomBoolean, getRandomEnum, getRandomEnums, getRandomItem} from '@project/util-core';
import {values} from './mocks/values';
import {
  Gender,
  Level, PaymentOption, PurchaseType,
  Role,
  TrainingTime,
  TrainingType,
  UserLocation
} from '@project/shared-types';
import {Static, validationConstraints} from '@project/shared-constants';
import {configDotenv} from 'dotenv';
import {EnvPaths, ROOT_ENV} from '@project/configurations';
import {join} from 'path';
import * as process from 'process';
import {FillRepository} from './fill.repository';

@Command({
  name: 'fill',
  options: {
    isDefault: true,
  },
})
export class FillCommand extends CommandRunner{
  constructor(
    private readonly generator: Generator,
    private readonly repository: FillRepository
  ) {
    super();
  }

  async run(): Promise<void> {
    Logger.log('Fill base command!');
    configDotenv({path: join(ROOT_ENV, EnvPaths.fill)});
    await this.repository.dropUsers();
    await this.repository.dropFiles();
    await this.repository.dropNotifications();
    await this.repository.dropFriends();
    await this.repository.dropRequests();
    await this.repository.dropTrainings();
    await this.repository.dropRefresh();
    const coachesCount = parseInt(process.env.COACHES, 10);
    const sportsmenCount = parseInt(process.env.SPORTSMEN, 10);
    const trainingCount = parseInt(process.env.TRAININGS, 10);
    const ordersCount = parseInt(process.env.ORDERS, 10);
    const maxOrderCount = parseInt(process.env.MAX_ORDER_COUNT, 10);
    const feedbacksCount = parseInt(process.env.FEEDBACKS, 10);
    const coaches = await this.repository.insertUsers(
      await Promise.all(Array.from(new Array(coachesCount),(_) => this.fillCoach()))
    );
    const sportsmen = await this.repository.insertUsers(
      await Promise.all(Array.from(new Array(sportsmenCount),(_) => this.fillSportsmen()))
      );
    const friends =
      await this.repository.insertFriends(await this.generator.generateFriends(coaches, sportsmen));
    await this.repository.insertNotifications(await this.generator.generateFriendNotification(friends));
    const joinRequest =
      await this.repository.insertJoinRequests(await this.generator.generateJoinRequest(coaches, sportsmen));
    await this.repository.insertNotifications(await this.generator.generateJoinNotification(joinRequest));
    const trainings = await this.repository.insertTrainings(
      await Promise.all(Array.from(new Array(trainingCount), (_) => this.fillTraining(coaches)))
    );
    const orders = await this.repository.insertOrders(
      await Promise.all(Array.from(new Array(ordersCount), (_) =>
        this.fillOrder(sportsmen, trainings, maxOrderCount)))
    );
    await this.repository.insertBalances(orders);
    const feedbacks = await this.repository.insertFeedbacks(
      await Promise.all(Array.from(new Array(feedbacksCount), (_) =>
        this.fillFeedback(sportsmen, trainings.map((training) => training.id))))
    );
    await this.repository.setRating(feedbacks);
  }

  private async getUser() {
    return {
    name: getRandomItem(values.name),
    email: (await this.generator.generateEmail)(),
    avatarId: await this.generator.generateAvatarId(),
    password: await this.generator.generatePassword('111111'),
    gender: getRandomEnum(Gender) as Gender,
    birthDate: this.generator.getBirthDate(),
    description: getRandomItem(values.descriptions),
    location: getRandomEnum(UserLocation) as UserLocation,
    imagePath: await this.generator.getBackground(Static.Endpoint.USER),
    createDate: new Date(),
    level: getRandomEnum(Level) as Level,
    trainingType:
      getRandomEnums(TrainingType, validationConstraints.user.trainingType.max, true) as TrainingType[],
    isReady: getRandomBoolean(),
    };
  }

  async fillCoach() {
    const user = await this.getUser();
    return {...user,
      role: Role.coach,
      addition: {
        certificateId: await this.generator.generateCertificateId(),
        merits: getRandomItem(values.descriptions)
      }
    };
  }

  async fillSportsmen() {
    const user = await this.getUser();
    return {...user,
      role: Role.sportsman,
      addition: {
        trainingTime: getRandomEnum(TrainingTime) as TrainingTime,
        trainingCalories: generateRandomValue(
          validationConstraints.user.trainingCalories.min, validationConstraints.user.trainingCalories.max),
        daysCalories: generateRandomValue(
          validationConstraints.user.daysCalories.min, validationConstraints.user.daysCalories.max),
      }
    };
  }

  async fillTraining(coaches: string[]) {
    return {
      name: getRandomItem(values.name),
      backgroundPath: await this.generator.getBackground(Static.Endpoint.TRAINING),
      level: getRandomEnum(Level),
      trainingType: getRandomEnum(TrainingType),
      trainingTime: getRandomEnum(TrainingTime),
      price: generateRandomValue(validationConstraints.training.price.min, 1000000),
      caloriesCount: generateRandomValue(
        validationConstraints.training.caloriesCount.min,
        validationConstraints.training.caloriesCount.max),
      description: getRandomItem(values.descriptions),
      gender: getRandomEnum(Gender),
      videoId: await this.generator.generateVideoId(),
      rating: 0,
      coachId: getRandomItem(coaches),
      isSpecialOffer: getRandomBoolean(),
      createDate: new Date()
    };
  }

  async fillOrder(
    sportsmen: string[],
    trainings:{id: number, price: number}[],
    maxCount: number
  ) {
    const training = getRandomItem(trainings);
    const count = generateRandomValue(1, maxCount);
    return {
      userId : getRandomItem(sportsmen),
      purchaseType : PurchaseType.membership,
      trainingId : training.id,
      price : training.price,
      count : count,
      total : training.price * count,
      paymentOption : getRandomEnum(PaymentOption),
      createDate : new Date(),
    };
  }

  async fillFeedback(sportsmen: string[],  trainings: number[]) {
    return {
      authorId : getRandomItem(sportsmen),
      trainingId : getRandomItem(trainings),
      rating : generateRandomValue(
        validationConstraints.feedback.rating.min,
        validationConstraints.feedback.rating.max
      ),
      text : getRandomItem(values.feedbacks),
      createDate : new Date()
    };
  }
}
