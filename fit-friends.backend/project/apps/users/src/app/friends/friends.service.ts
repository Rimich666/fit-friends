import {Injectable} from '@nestjs/common';
import {FriendsInterface} from '@project/shared-types';
import {FriendsEntity} from './friends.entity';
import {FriendsRepository} from './friends.repository';
import {FitUsersService} from '../fit-users/fit-users.service';
import {FitUsersRepository} from '../fit-users/fit-users.repository';

@Injectable()
export class FriendsService {
  constructor(
    private friendsRepository: FriendsRepository,
    private fitUserService: FitUsersService,
    private fitUserRepository: FitUsersRepository
  ) {}

  public async create(friends : FriendsInterface){
    const pair = await this.friendsRepository.create(new FriendsEntity(friends));
    return this.fitUserService.getUser(pair.sweetCouple[1]);
  }


  public async delete({sweetCouple} : FriendsInterface){
    const pair = await this.friendsRepository.delete(sweetCouple);
    return this.fitUserService.getUser(pair.sweetCouple[1]);
  }


  public async getFriends(id: string){
    const promises =
      (await this.friendsRepository.find(id)).map((friendId) => this.fitUserService.getUser(friendId));
    return Promise.all(promises);
  }

  async checkUser(userId: string): Promise<boolean> {
    const user = await this.fitUserRepository.findById(userId);
    return user !== null;
  }
}
