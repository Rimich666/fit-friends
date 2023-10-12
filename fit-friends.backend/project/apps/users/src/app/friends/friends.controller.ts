import {Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {JwtAuthGuard, User, UserOnlyGuard} from '@project/shared-enhancers';
import {FriendsDto} from '@project/shared-dto';
import {FriendsService} from './friends.service';
import {NotFriendGuard} from './not-friend.guard';

@Controller('friends')
@UseGuards(JwtAuthGuard)
export class FriendsController {

  constructor(
    private friendsService: FriendsService,
  ) {}

  @Post('/')
  @UseGuards(NotFriendGuard, UserOnlyGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@Body() {friendId}: FriendsDto, @User() {userId}) {
    return await this.friendsService.create({sweetCouple: [userId, friendId]});
  }

  @Delete('/:id')
  async delete(@Param('id') friendId: string, @User() {userId}) {
    return await this.friendsService.delete({sweetCouple: [userId, friendId]});
  }

  @Get('/')
  async index(@User() {userId}) {
    return await this.friendsService.getFriends(userId);
  }
}
