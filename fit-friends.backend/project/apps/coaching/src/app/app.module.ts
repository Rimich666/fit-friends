import { Module } from '@nestjs/common';
import {ConfigCoachingModule} from '@project/config-coaching';

@Module({
  imports: [
    ConfigCoachingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
