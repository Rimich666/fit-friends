import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Role} from '@project/shared-types';

@Injectable()
export class UserOnlyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;
    if (role !== Role.sportsman) {
      throw new UnauthorizedException('Only for sportsmen');
    }
    return true;
  }
}
