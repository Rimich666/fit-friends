import {Injectable} from '@nestjs/common';
import {FriendsEntity} from './friends.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {FriendsUsersModel} from '@project/fit-users.model';
import {PairType} from '@project/shared-types';

@Injectable()
export class FriendsRepository {
  constructor(
    @InjectModel(FriendsUsersModel.name) private readonly friendModel: Model<FriendsUsersModel>) {
  }

  public async create(friends: FriendsEntity) {
    const existed = await this.friendModel.findOne({sweetCouple: { $all: friends.sweetCouple}});
    return existed ? existed : await this.friendModel.create(friends);
  }

  public async delete(sweetCouple: PairType) {
    return this.friendModel.findOneAndDelete({sweetCouple: { $all: sweetCouple}});
  }

  public async find(id: string) {
    const pairs: PairType[] = (await this.friendModel.find({sweetCouple: id})).
      map((friend) => friend.sweetCouple);
    return pairs.map((pair) => pair[(pair.indexOf(id) - 1) * -1]);
  }

  public async isFriends(friends: FriendsEntity) {
    const found = await this.friendModel.findOne({sweetCouple: { $all: friends.sweetCouple}});
    return !!found;
  }
}
