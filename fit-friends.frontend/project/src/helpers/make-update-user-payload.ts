import {UpdateUserInterface} from '../types/update-user.interface';
import {UserInterface} from '../types/user.interface';
import {Types} from '../types/field.interface';

export const makeUpdateUserPayload = (user: UpdateUserInterface, oldUser: UserInterface) => {

  const compareArray = <T>(val: T[], old: T[]): boolean => {
    const valLength = val.length;
    if (valLength !== old.length) {
      return false;
    }
    const set = new Set(old.concat(val));
    return valLength === set.size;
  };

  const compare = <T>(val: T, old: T): boolean => {
    if (Array.isArray(val) && Array.isArray(old)) {
      return compareArray(val, old);
    }
    return val === old;
  };

  const changes = Object.keys(user).map((key) =>
    compare(user[key], oldUser[key as keyof UserInterface]) ? [key, undefined as unknown as Types] : [key, user[key]])
    .filter((item) => item[1] !== undefined);

  if (changes.length === 0 && user.avatar === undefined) {
    return false;
  }

  const payload = new FormData();
  payload.append('user', JSON.stringify(Object.fromEntries(changes)));
  if (user.avatar) {
    payload.append('avatar', user.avatar);
  }
  return payload;
};
