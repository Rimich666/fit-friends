import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {UserInterface} from '@project/shared-types';
import {FitUserModel} from '@project/fit-users.model';
import {UserEntity} from './user.entity';
import {UsersFilterDto} from '@project/shared-dto';

@Injectable()
export class FitUsersRepository {
  constructor(
    @InjectModel(FitUserModel.name) private readonly userModel: Model<FitUserModel>) {
  }
  public async create(item: UserEntity): Promise<UserInterface> {
    const user = new this.userModel(item);
    return user.save();
  }

  public async findByEmail(email: string): Promise<FitUserModel | null> {
    return this.userModel.findOne({email});
  }

  public async findById(id: string): Promise<UserInterface | null> {
    return this.userModel.findById(id);
  }

  public async find(options: UsersFilterDto) {
    const {sort, order, limit, page, ...filter} = options;
    return this.userModel.find(filter).sort({[sort]: order}).limit(limit).skip((page - 1) * limit).exec();
  }

  public async update(id: string, item: UserEntity): Promise<UserInterface> {
    const updatedUser = await this.userModel.findById(id);
    item.addition = Object.assign(Object.fromEntries(updatedUser.addition as Map<string, string | number>), item.addition);
    await this.userModel.findByIdAndUpdate(id, item);
    return this.userModel.findById(id);
  }
}
