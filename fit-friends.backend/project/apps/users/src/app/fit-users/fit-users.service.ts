import { Injectable } from '@nestjs/common';
import {FitUsersRepository} from './fit-users.repository';
import {UpdateUserDto, UsersFilterDto} from '@project/shared-dto';
import {UserEntity} from './user.entity';

@Injectable()
export class FitUsersService {
  constructor(
    private readonly userRepository: FitUsersRepository,
  ) {}
  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  public async getUsers(filters: UsersFilterDto) {
    return this.userRepository.find(filters);
  }

  public async update(id: string, dto: UpdateUserDto) {
    return this.userRepository.update(id, new UserEntity(dto));
  }
}
