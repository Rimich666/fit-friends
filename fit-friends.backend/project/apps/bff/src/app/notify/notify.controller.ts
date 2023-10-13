import {Controller, Post} from '@nestjs/common';
import {NotifyService} from './notify.service';

@Controller('notify')
export class NotifyController {
  constructor(
    private readonly notifyService: NotifyService
  ) {}

  @Post('/')
  public async send() {
    await this.notifyService.sendNews();
  }
}
