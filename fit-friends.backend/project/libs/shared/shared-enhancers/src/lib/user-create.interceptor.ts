import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {fillCreateDto} from '@project/shared-dto';

@Injectable()
export class UserCreateInterceptor implements NestInterceptor {
  async intercept(context:ExecutionContext, next:CallHandler): Promise<Observable<any>> {
    const logger = new Logger('UserCreateInterceptor');
    logger.log(`UserCreateInterceptor`);
    const req = context.switchToHttp().getRequest();
    if (req.headers['content-type'] !== 'application/json') {
      req.body = JSON.parse(req.body.user);
    }
    req.body.addition = fillCreateDto[req.body.role](req.body.addition);
    return next.handle();
  }
}
