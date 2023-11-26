import {BadRequestException, ConflictException, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto, LoginUserDto} from '@project/shared-dto';
import {UserInterface} from '@project/shared-types';
import {FitUsersRepository} from '../fit-users/fit-users.repository';
import {ConfigService, ConfigType} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {jwtUsersConfig} from '@project/configurations';
import {RefreshTokenService} from '../refresh-token/refresh-token.service';
import {UserEntity} from '../fit-users/user.entity';
import {UserExceptionMessage} from '@project/shared-constants';
import {createJWTPayload} from '@project/util-core';
import * as crypto from 'node:crypto';


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly fitUserRepository: FitUsersRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject (jwtUsersConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtUsersConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}


  public async register(dto: CreateUserDto): Promise<UserInterface> {
    const {email, name, password} = dto;

    const user = {
      ...dto,
      password: '',
    };
    const existedUser = await this.fitUserRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(UserExceptionMessage.UserExists);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password);
    return this.fitUserRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existedUser = await this.fitUserRepository.findByEmail(email);

    if (!existedUser) {
      throw new BadRequestException(UserExceptionMessage.UserPasswordWrong);
    }

    const userEntity = new UserEntity(existedUser);
    if (!await userEntity.comparePassword(password)) {
      throw new BadRequestException(UserExceptionMessage.UserPasswordWrong);
    }

    return userEntity.toObject();
  }

  public async createUserToken(user: UserInterface) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload, {
        secret: this.jwtOptions.accessTokenSecret,
        expiresIn: this.jwtOptions.accessTokenExpiresIn
      }),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    };
  }
}
