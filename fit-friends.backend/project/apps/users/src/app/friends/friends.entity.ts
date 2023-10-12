import {FriendsInterface, PairType} from '@project/shared-types';

export class FriendsEntity implements FriendsInterface {
  public id: string;
  public sweetCouple: PairType;

  constructor(friends: FriendsInterface) {
    this.fillEntity(friends);
  }

  public fillEntity(friends: FriendsInterface) {
    this.id = friends.id;
    this.sweetCouple = friends.sweetCouple;
  }

  public toObject() {
    return {
      ...this
    };
  }
}
