import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {fillUpdateDto} from '@project/shared-dto';

@Injectable()
export class UserUpdateInterceptor implements NestInterceptor {
 async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
   const req = context.switchToHttp().getRequest();
   if (req.headers['content-type'] !== 'application/json') {
      req.body = JSON.parse(req.body.user);
      return next.handle();
    }
   const body = req.body;
   const role = req.user.role;
   body.addition = fillUpdateDto[role](body.addition);
   return next.handle();
  }
}
