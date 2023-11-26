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
  ValidationPipe, ParseIntPipe, Post, Delete
} from '@nestjs/common';
import {UsersFilterDto} from '@project/shared-dto';
import {FitUsersService} from './fit-users.service';
import {
  JwtAuthGuard,
  SelfOnlyGuard,
  User,
  UserOnlyGuard,
  UserUpdateInterceptor
} from '@project/shared-enhancers';
import {UpdateUserDto} from '@project/shared-dto';
import {ControllerPrefix, EndPoints} from '@project/shared-constants';
import { Response as Res } from 'express';
import {TokenPayloadInterface} from '@project/shared-types';

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

  @Get('/self')
  @UseGuards(JwtAuthGuard)
  async getSelf(@User() user: TokenPayloadInterface) {
    return this.userService.getUser(user.userId);
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

  @UseGuards(JwtAuthGuard, UserOnlyGuard)
  @Get(`/${EndPoints.company}/:limit`)
  async getCompany(@Param('limit', ParseIntPipe) limit: number) {
    return this.userService.getCompany(limit);
  }

  @Post(`/${EndPoints.certificates}`)
  @UseGuards(JwtAuthGuard)
  async addCertificates(@Body() certificates: string[], @User() {userId}) {
    return this.userService.addCertificates(userId, certificates);
  }

  @Delete(`/${EndPoints.certificates}/:id`)
  @UseGuards(JwtAuthGuard)
  async deleteCertificates(@Param('id') certificate: string, @User() {userId}) {
    return this.userService.deleteCertificates(userId, certificate);
  }

  @Patch(`/${EndPoints.certificates}/:id`)
  @UseGuards(JwtAuthGuard)
  async changeCertificates(@Body() add: string[], @Param('id') del: string, @User() {userId}) {
    return this.userService.changeCertificates(userId, add, del);
  }
}
