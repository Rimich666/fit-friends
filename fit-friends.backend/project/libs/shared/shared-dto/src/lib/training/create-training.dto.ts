import {Gender, Level, TrainingTime, TrainingType} from '@project/shared-types';
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
import {Transform} from 'class-transformer';
import {validationConstraints} from '@project/shared-constants';
import {trainingTypeError} from "../error-mesages";

export class CreateTrainingDto {
  @MinLength(validationConstraints.training.name.min)
  @MaxLength(validationConstraints.training.name.max)
  name: string;

  @IsString()
  backgroundPath: string;

  @IsEnum(Level)
  level: Level;

  @IsEnum(TrainingType)
  trainingType: TrainingType;

  @IsEnum(TrainingTime, {message: trainingTypeError})
  trainingTime: TrainingTime;

  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.training.price.min)
  price: number;

  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.training.caloriesCount.min)
  @Max(validationConstraints.training.caloriesCount.max)
  caloriesCount: number;

  @MinLength(validationConstraints.training.description.min)
  @MaxLength(validationConstraints.training.description.max)
  description: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsMongoId()
  videoId: string;

  @IsOptional()
  @IsBoolean()
  @Transform(params => params.value.toLowerCase() === 'true')
  isSpecialOffer = false;
}
