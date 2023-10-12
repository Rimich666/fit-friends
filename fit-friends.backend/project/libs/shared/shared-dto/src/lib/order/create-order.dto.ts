import {PaymentOption, PurchaseType} from '@project/shared-types';
import {IsEnum, IsInt, IsOptional, IsPositive} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  userId?: string;

  @IsEnum(PurchaseType)
  purchaseType: string;

  @IsInt()
  trainingId: number;

  @IsInt()
  price?: number;

  @IsPositive()
  @IsInt()
  count: number;

  @IsInt()
  total?: number;

  @IsEnum(PaymentOption)
  paymentOption: PaymentOption;
}
