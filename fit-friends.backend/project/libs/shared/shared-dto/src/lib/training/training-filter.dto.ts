import {FilterDto} from '../filter.dto';
import {IsInt, IsOptional, Max, Min} from 'class-validator';
import {validationConstraints} from '@project/shared-constants';
import {Transform} from 'class-transformer';

export class TrainingFilterDto extends FilterDto {
  @IsOptional()
  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  public priceMin: number;

  @IsOptional()
  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  public priceMax: number;

  @IsOptional()
  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.training.caloriesCount.min)
  @Max(validationConstraints.training.caloriesCount.max)
  public caloriesMin: number;

  @IsOptional()
  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.training.caloriesCount.min)
  @Max(validationConstraints.training.caloriesCount.max)
  public caloriesMax: number;

  @IsOptional()
  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.training.rating.min)
  @Max(validationConstraints.training.rating.max)
  public rating: number;

  @IsOptional()
  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.training.rating.min)
  @Max(validationConstraints.training.rating.max)
  public ratingMin: number;

  @IsOptional()
  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.training.rating.min)
  @Max(validationConstraints.training.rating.max)
  public ratingMax: number;
}
