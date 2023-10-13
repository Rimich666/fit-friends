import {Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {JwtAuthGuard, User, UserOnlyGuard} from '@project/shared-enhancers';
import {FriendsDto} from '@project/shared-dto';
import {FriendsService} from './friends.service';
import {NotFriendGuard} from './not-friend.guard';
import {addedToFriendsNotification, removedFromFriendsNotification} from '@project/helpers';
import {NotificationService} from '../notification/notification.service';

@Controller('friends')
@UseGuards(JwtAuthGuard)
export class FriendsController {

  constructor(
    private readonly friendsService: FriendsService,
    private readonly notificationService: NotificationService
  ) {}

  @Post('/')
  @UseGuards(NotFriendGuard, UserOnlyGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@Body() {friendId}: FriendsDto, @User() {userId, name}) {
    const created = await this.friendsService.create({sweetCouple: [userId, friendId]});
    await this.notificationService.create({userId: friendId, text: addedToFriendsNotification(name)});
    return created;
  }

  @Delete('/:id')
  async delete(@Param('id') friendId: string, @User() {userId, name}) {
    const deleted = await this.friendsService.delete({sweetCouple: [userId, friendId]});
    await this.notificationService.create({userId: friendId, text: removedFromFriendsNotification(name)});
    return deleted;
  }

  @Get('/')
  async index(@User() {userId}) {
    return await this.friendsService.getFriends(userId);
  }
}
