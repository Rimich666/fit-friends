import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {NotYourAccountException} from '@project/util-core';
import {fillUpdateDto} from '@project/shared-dto';

@Injectable()
export class UserUpdateInterceptor implements NestInterceptor {
 async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const id = context.switchToHttp().getRequest().params.id;
    const req = context.switchToHttp().getRequest();
    if (id !== req.user.userId) {
      throw new NotYourAccountException();
    }
    const body = req.body;
    const role = req.user.role;
    body.addition = fillUpdateDto[role](body.addition);
    return next.handle();
  }
}
