import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {FeedbackFilterDto} from '@project/shared-dto';
import {fillObject} from '@project/util-core';

@Injectable()
export class FeedbackGetInterceptor implements NestInterceptor {
  async intercept(context:ExecutionContext, next:CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    req.params['id'] = fillObject(FeedbackFilterDto, {trainingId: req.params['id']});
    return next.handle();
  }
}
