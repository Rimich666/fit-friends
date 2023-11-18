import {Injectable} from '@nestjs/common';
import {FitUsersRepository} from './fit-users.repository';
import {UpdateUserDto, UserRdo, UsersFilterDto} from '@project/shared-dto';
import {UserEntity} from './user.entity';
import {fillObject} from '@project/util-core';
import {Role, UserInterface} from '@project/shared-types';

@Injectable()
export class FitUsersService {
  constructor(
    private readonly userRepository: FitUsersRepository,
  ) {}

  private fillUser(user: UserInterface) {
    console.log(user);
    return {... fillObject(UserRdo, user), addition: Object.fromEntries(user.addition as Map<string, string | number | string[]>)};
  }

  public async getUser(id: string) {
    const user = await this.userRepository.findById(id);
    return this.fillUser(user);
  }

  public async checkUser(id: string) {
    return !!await this.userRepository.findById(id);
  }

  public async getUsers(filters: UsersFilterDto) {
    const users = await this.userRepository.find(filters);
    return users.map((user) => this.fillUser(user));
  }

  public async getPageCount(filters: UsersFilterDto) {
    return this.userRepository.count(filters);
  }

  public async update(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.update(id, new UserEntity(dto));
    return this.fillUser(user);
  }

  public async isCoach(id: string) {
    const user = await this.userRepository.findById(id);
    return user ? user.role === Role.coach : false;
  }
}
