import {Body, Controller, Delete, Post, UseGuards, UseInterceptors, ValidationPipe} from '@nestjs/common';
import {fillObject} from '@project/util-core';
import {AuthenticationService} from './authentication.service';
import {CreateUserDto, UserRdo} from '@project/shared-dto';
import {JwtRefreshGuard, LocalAuthGuard, User, UserCreateInterceptor} from '@project/shared-enhancers';
import {LoginUserDto} from '@project/shared-dto';
import {NoAuthGuard} from '@project/shared-enhancers';
import {UserInterface} from '@project/shared-types';
import {ControllerPrefix} from '@project/shared-constants';


@Controller(ControllerPrefix.authentication)
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
  ) {}
  @Post('register')
  @UseGuards(NoAuthGuard)
  @UseInterceptors(UserCreateInterceptor)
  public async register(@Body(ValidationPipe) createUserDto: CreateUserDto){
    const user = await this.authenticationService.register(createUserDto);
    return {...(fillObject(UserRdo, user)), addition: Object.fromEntries(user.addition as Map<string, string | number>)};
  }

  @Post('login')
  @UseGuards(NoAuthGuard, LocalAuthGuard)
  public async login(@User() user: LoginUserDto){
    return await this.authenticationService.createUserToken(user);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(@User() user: UserInterface) {
    return this.authenticationService.createUserToken(user);
  }

  @Delete('refresh')
  @UseGuards(JwtRefreshGuard)
  public async dropToken(){
    return 'Refresh token successfully neutralized';
  }
}
