import {BadRequestException, CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {SubscribeDto} from '@project/shared-dto';
import {BffService} from '../bff.service';
import {appsConfig} from '@project/configurations';

@Injectable()
export class NotCoachGuard implements CanActivate {
  constructor(
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly bffService: BffService
  ) {}
  async canActivate(context:ExecutionContext): Promise<boolean> {
    const body = context.switchToHttp().getRequest().body as SubscribeDto;
    const coachId = body.coachId;
    const isCoach = await this.bffService.isCoach(coachId);
    if (!isCoach) {
      throw new BadRequestException('You can only subscribe to the coach');
    }

    return true;
  }
}
