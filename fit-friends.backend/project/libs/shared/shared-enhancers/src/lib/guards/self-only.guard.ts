import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {NotYourAccountException} from '@project/util-core';

@Injectable()
export class SelfOnlyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const id = context.switchToHttp().getRequest().params.id;
   const req = context.switchToHttp().getRequest();
   if (id !== req.user.userId) {
     throw new NotYourAccountException();
   }
   return true;
  }
}
