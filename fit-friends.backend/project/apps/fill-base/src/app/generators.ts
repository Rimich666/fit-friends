import {values} from './mocks/values';
import {getRandomFile, getRandomItem, getRandomItems, getRandomPastDate, getUploadDirectory} from '@project/util-core';
import {Injectable} from '@nestjs/common';
import {FillRepository} from './fill.repository';
import {PROJECT_PATH, SALT_ROUNDS, Static} from '@project/shared-constants';
import { join } from 'path';
import crypto from 'node:crypto';
import {copyFile} from 'node:fs/promises';
import dayjs from 'dayjs';
import {EnvPaths, ROOT_ENV} from '@project/configurations';
import {ensureDir} from 'fs-extra';
import fs from 'fs';
import {addedToFriendsNotification, createRequestNotification, getBackgroundFile} from '@project/helpers';
import {genSalt, hash} from 'bcrypt';
import {readSingle} from 'read-env-file';
import {FriendsUsersModel} from '@project/fit-users.model';
import {FriendsInterface, JoinTrainingInterface, PairType, RequestState} from '@project/shared-types';


@Injectable()
export class Generator {
  constructor(
    private readonly repository: FillRepository) {}

  private async getEmail() {
    let count = 0;
    return function generate() {
      const loc = values.email.local;
      const dom = values.email.local;
      return `${getRandomItem(loc)}-${getRandomItem(loc)}${count++}@${getRandomItem(dom)}.com`;
    };
  }

  private mockPath = join(PROJECT_PATH, 'apps', 'fill-base', 'src', 'app', 'mocks');

  private getAvatarPath = () => join(this.mockPath, 'avatars');

  private getCertificatePath = () => join(this.mockPath, 'certificates');

  private getVideoPath = () => join(this.mockPath, 'videos');

  public generateEmail= this.getEmail();

  private async copyFile(fileName: string, path: string) {
    const uploadPath = getUploadDirectory(join(ROOT_ENV, EnvPaths.uploader));
    const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    const [ year, month , day] = dayjs().format('YYYY MM DD').split(' ');
    const subDirectory = join(`${year}`,`${month}`,`${day}`);
    const uuid = crypto.randomUUID();
    const hashName = `${uuid}.${fileExtension}`;
    const destinationFile = join(`${uploadPath}`, `${subDirectory}`, `${hashName}`);
    await ensureDir(join(`${uploadPath}`, `${subDirectory}`));
    await copyFile(join(`${path}`, `${fileName}`), destinationFile);
    return {
      hashName: hashName,
      originalName: fileName,
      path: `/${year}/${month}/${day}/${hashName}`,
      size: fs.statSync(destinationFile).size,
      mimetype: fileExtension,
    };
  }

  public generateAvatarId = async () => {
    const avatar = (await getRandomFile(this.getAvatarPath()));
    return (await this.repository.fileSave(await this.copyFile(avatar, this.getAvatarPath()))).id;
  };

  public generateCertificateId = async () => {
    const certificate = (await getRandomFile(this.getCertificatePath()));
    return (await this.repository.fileSave(await this.copyFile(certificate, this.getCertificatePath()))).id;
  };

  public generateVideoId = async () => {
    const video = (await getRandomFile(this.getVideoPath()));
    return (await this.repository.fileSave(await this.copyFile(video, this.getVideoPath()))).id;
  };

  public getBirthDate() {
    const minAge = 10 * 365;
    const maxAge = 120 * 365;
    return getRandomPastDate(minAge, maxAge);
  }

  public async getBackground(endpoint: string) {
    const port = (await readSingle(join(ROOT_ENV, EnvPaths.bff))).PORT;
    const background = (await getBackgroundFile(endpoint));
    return `http://${Static.HOST}:${port}${Static.SERVE_ROOT}/${endpoint}/${background}`;
  }

  public async generatePassword(password: string) {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(password, salt);
  }

  public async generateFriends(coaches: string[], sportsmen: string[]) {
    const users = [...coaches, ...sportsmen];
    return getRandomItems(sportsmen).map((sportsman) => {
      const friends = getRandomItems(users).map((user) =>
        ({sweetCouple: [sportsman, user] as PairType}));
      users.splice(users.indexOf(sportsman), 1);
      return friends;
    }).reduce((acc, curr) => acc.concat(curr), [] as FriendsUsersModel[]);
  }

  public async generateJoinRequest(coaches: string[], sportsmen: string[]) {
    const users = [...coaches, ...sportsmen];
    return getRandomItems(sportsmen).map((sportsman) => {
      const requests = getRandomItems(users, 3, true).map((user) =>
        ({invitedId: user, requesterId: sportsman, state: RequestState.consideration, createDate: new Date(), changeDate: new Date()}));
      users.splice(users.indexOf(sportsman), 1);
      return requests;
    }).reduce((acc, curr) => acc.concat(curr), [] as JoinTrainingInterface[]);
  }

  public async getNotify(pair: PairType) {
    const name = await this.repository.getUserNameById(pair[0]);
    return {
      userId: pair[1],
      text: addedToFriendsNotification(name),
      createDate: new Date()
    };
  }

  public async getRequest(request: JoinTrainingInterface){
    const name = await this.repository.getUserNameById(request.requesterId);
    return {
      userId: request.invitedId,
      text: createRequestNotification(name),
      createDate: new Date()
    };
  }

  public async generateFriendNotification(friends: FriendsInterface[]) {
    return Promise.all(friends.map((friend) => this.getNotify(friend.sweetCouple)));
  }

  public async generateJoinNotification(requests: JoinTrainingInterface[]) {
    return Promise.all(requests.map((request) => this.getRequest(request)));
  }
}
