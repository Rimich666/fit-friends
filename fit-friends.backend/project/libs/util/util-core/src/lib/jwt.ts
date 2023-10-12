import {TokenPayloadInterface, UserInterface} from '@project/shared-types';

export function createJWTPayload(user: UserInterface): TokenPayloadInterface {
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
}
