import {CanActivate, ConflictException, ExecutionContext, Injectable, RequestMethod} from '@nestjs/common';
import {FriendsService} from './friends.service';
import {NotExistsUserException} from '@project/util-core';

@Injectable()
export class NotFriendGuard implements CanActivate {
  constructor(
    private friendsService: FriendsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const friendId = req.method === RequestMethod[RequestMethod.POST] ?
      req.body['friendId'] :
      req.params['id'];
    const userId = req.user.id;
    if (friendId === userId) {
      throw new ConflictException('Of course, you are your own friend');
    }
    const checked = await this.friendsService.checkUser(friendId);
    if (!checked) {
      throw new NotExistsUserException(friendId);
    }
    return true;
  }
}
