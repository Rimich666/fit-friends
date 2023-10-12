import {FilterDto} from '../filter.dto';
import {IsEnum, IsOptional} from 'class-validator';
import {DefaultSort, OrderSortFieldsEnum} from '@project/shared-types';

export class OrderFilterDto extends FilterDto {
  @IsOptional()
  @IsEnum(OrderSortFieldsEnum)
  public sort: string = DefaultSort.FIELD;

  @IsOptional()
  public coachId: string;
}
