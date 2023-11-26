import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from '@nestjs/common';
import {Role} from '@project/shared-types';

@Injectable()
export class UserOnlyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;
    if (role !== Role.sportsman) {
      throw new ForbiddenException('Only for sportsmen');
    }
    return true;
  }
}
