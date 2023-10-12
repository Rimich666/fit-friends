import {IsEnum, IsNumber, IsOptional} from 'class-validator';
import {DefaultSort, Order, RESPONSE_PAGE_LIMIT} from '@project/shared-types';
import {Transform} from 'class-transformer';

export class FilterDto {
  @IsOptional()
  @IsEnum(Order)
  public order: Order = DefaultSort.ORDER;

  @IsOptional()
  @IsNumber()
  @Transform((params) => parseInt(params.value, 10))
  public limit: number = RESPONSE_PAGE_LIMIT;

  @IsOptional()
  @IsNumber()
  @Transform((params) => parseInt(params.value, 10))
  public page = 1;
}
