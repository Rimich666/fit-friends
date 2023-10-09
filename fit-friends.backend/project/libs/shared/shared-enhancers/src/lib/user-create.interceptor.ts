import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {fillCreateDto} from '@project/shared-dto';

@Injectable()
export class UserCreateInterceptor implements NestInterceptor {
  async intercept(context:ExecutionContext, next:CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    req.body.addition = fillCreateDto[req.body.role](req.body.addition);
    return next.handle();
  }
}
