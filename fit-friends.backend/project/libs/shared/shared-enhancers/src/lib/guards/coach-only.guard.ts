import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Role} from '@project/shared-types';

@Injectable()
export class CoachOnlyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;
    if (role !== Role.coach) {
      throw new UnauthorizedException('Only for coaches.');
    }
    return true;
  }
}
