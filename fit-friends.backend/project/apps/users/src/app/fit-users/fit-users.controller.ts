import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Response,
  ValidationPipe
} from '@nestjs/common';
import {UsersFilterDto} from '@project/shared-dto';
import {FitUsersService} from './fit-users.service';
import {JwtAuthGuard, SelfOnlyGuard, UserOnlyGuard, UserUpdateInterceptor} from '@project/shared-enhancers';
import {UpdateUserDto} from '@project/shared-dto';
import {ControllerPrefix} from '@project/shared-constants';
import { Response as Res } from 'express';

@Controller(ControllerPrefix.fitUsers)
export class FitUsersController {
   constructor(
    private userService: FitUsersService,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard, UserOnlyGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async index(@Query() filters: UsersFilterDto, @Response() response: Res) {
    const users = await this.userService.getUsers(filters);
    const count = await this.userService.getPageCount(filters);
    return response.set({ 'List-Size': count }).json(users);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async show(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, SelfOnlyGuard)
  @UseInterceptors(UserUpdateInterceptor)
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Get('/:id/isCoach/')
  async isCoach(@Param('id') coachId: string)
  {
    return this.userService.isCoach(coachId);
  }
}
