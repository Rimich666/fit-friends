import {IsEnum, IsInt, IsOptional} from 'class-validator';
import {DefaultSort, Order, RESPONSE_PAGE_LIMIT} from '@project/shared-types';
import {Expose, Transform} from 'class-transformer';

export class FilterDto {
  @Expose()
  @IsOptional()
  @IsEnum(Order)
  @Transform((params) =>
    params.value ? params.value : DefaultSort.ORDER)
  public order: Order = DefaultSort.ORDER;

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform((params) =>
    params.value ? parseInt(params.value, 10) : RESPONSE_PAGE_LIMIT)
  public limit: number = RESPONSE_PAGE_LIMIT;

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform((params) =>
    params.value ? parseInt(params.value, 10) : 1)
  public page = 1;
}
