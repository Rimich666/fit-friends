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

  public async getCompany(limit: number) {
    const users = await this.userRepository.getCompany(limit);
    return users.map((user) => this.fillUser(user));
  }

  public async addCertificates(userId: string, certificates: string[]) {
    const found = await this.userRepository.findById(userId);
    const addition = found.addition as Map<string, string | string[] | number>;
    const newCertificates = (addition.get('certificateId') as string[]).concat(certificates);
    const entity = new UserEntity({addition: {certificateId: newCertificates}});
    return this.userRepository.update(userId, entity);
  }

  public async deleteCertificates(userId: string, certificate: string) {
    const found = await this.userRepository.findById(userId);
    const addition = found.addition as Map<string, string | string[] | number>;
    const newCertificates = addition.get('certificateId') as string[];
    newCertificates.splice(newCertificates.indexOf(certificate), 1);
    const entity = new UserEntity({addition: {certificateId: newCertificates}});
    return this.userRepository.update(userId, entity);
  }

  public async changeCertificates(userId: string, add: string[], del: string) {
    const found = await this.userRepository.findById(userId);
    const addition = found.addition as Map<string, string | string[] | number>;
    const newCertificates = addition.get('certificateId') as string[];
    newCertificates.splice(newCertificates.indexOf(del), 1, ...add);
    const entity = new UserEntity({addition: {certificateId: newCertificates}});
    return this.userRepository.update(userId, entity);
  }
}
