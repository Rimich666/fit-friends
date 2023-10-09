import {TokenPayload, UserInterface} from '@project/shared-types';

export function createJWTPayload(user: UserInterface): TokenPayload {
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
}
