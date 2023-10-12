import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {validationConstraints} from '@project/shared-constants';
import {Gender, Level, TrainingTime, TrainingType} from '@project/shared-types';
import {Transform} from 'class-transformer';
import {trainingTypeError} from "../error-mesages";

export class UpdateTrainingDto {
  @IsOptional()
  @MinLength(validationConstraints.training.name.min)
  @MaxLength(validationConstraints.training.name.max)
  name?: string;

  @IsOptional()
  @IsString()
  backgroundPath: string;

  @IsOptional()
  @IsEnum(Level)
  level?: Level;

  @IsOptional()
  @IsEnum(TrainingType)
  trainingType?: TrainingType;

  @IsOptional()
  @IsEnum(TrainingTime, {message: trainingTypeError})
  trainingTime?: TrainingTime;

  @IsOptional()
  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.training.price.min)
  price?: number;

  @IsOptional()
  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.training.caloriesCount.min)
  @Max(validationConstraints.training.caloriesCount.max)
  caloriesCount?: number;

  @IsOptional()
  @MinLength(validationConstraints.training.description.min)
  @MaxLength(validationConstraints.training.description.max)
  description?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsMongoId()
  videoId?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(params => params.value.toLowerCase() === 'true')
  isSpecialOffer?: boolean;
}
