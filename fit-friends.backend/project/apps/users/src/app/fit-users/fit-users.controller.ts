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
  ValidationPipe
} from '@nestjs/common';
import {UsersFilterDto} from '@project/shared-dto';
import {FitUsersService} from './fit-users.service';
import {JwtAuthGuard, UserOnlyGuard, UserUpdateInterceptor} from '@project/shared-enhancers';
import {UpdateUserDto} from '@project/shared-dto';
import {ControllerPrefix} from '@project/shared-constants';


@Controller(ControllerPrefix.fitUsers)
export class FitUsersController {
   constructor(
    private userService: FitUsersService,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard, UserOnlyGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async index(@Query() filters: UsersFilterDto) {
    return this.userService.getUsers(filters);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async show(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserUpdateInterceptor)
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
    // return {... fillObject(UserRdo, updatedUser), addition: Object.fromEntries(updatedUser.addition as Map<string, string | number>)};
  }

  @Get('/:id/isCoach/')
  async isCoach(@Param('id') coachId: string)
  {
    return this.userService.isCoach(coachId);
  }
}
