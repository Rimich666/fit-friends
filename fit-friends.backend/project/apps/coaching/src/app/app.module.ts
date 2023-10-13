import { Module } from '@nestjs/common';
import { ConfigCoachingModule } from '@project/config-coaching';
import { PrismaModule } from './prisma/prisma.module';
import { TrainingModule } from './training/training.module';
import { OrderModule } from './order/order.module';
import { BalanceModule } from './balance/balance.module';
import { NotifyModule } from './notify/notify.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigCoachingModule,
    PrismaModule,
    TrainingModule,
    OrderModule,
    BalanceModule,
    NotifyModule,
    FeedbackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
