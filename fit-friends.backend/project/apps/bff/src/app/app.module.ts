import { Module } from '@nestjs/common';
import {ConfigBffModule} from '@project/config-bff';

@Module({
  imports: [
    ConfigBffModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
