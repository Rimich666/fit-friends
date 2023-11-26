import {
  ArrayMaxSize, IsBoolean,
  IsDate, IsDefined,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength, ValidateNested
} from 'class-validator';
import {validationConstraints} from '@project/shared-constants';
import {Addition, Gender, Level, TrainingType, UserLocation} from '@project/shared-types';
import {Transform} from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @MinLength(validationConstraints.user.name.min)
  @MaxLength(validationConstraints.user.name.max)
  @IsOptional()
  public name?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  public avatarId?: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsDate()
  @IsOptional()
  @Transform(params => new Date(params.value))
  birthDate?: Date;

  @IsString()
  @IsOptional()
  @MinLength(validationConstraints.user.description.min)
  @MaxLength(validationConstraints.user.description.max)
  description?: string;

  @IsEnum(UserLocation)
  @IsOptional()
  location?: UserLocation;

  @IsString()
  @IsOptional()
  imagePath?: string;

  @IsEnum(Level)
  @IsOptional()
  level?: Level;

  @IsEnum(TrainingType, {each: true})
  @ArrayMaxSize(validationConstraints.user.trainingType.max)
  @IsOptional()
  trainingType?: TrainingType[];

  @IsBoolean()
  @IsOptional()
  @Transform(params =>
    typeof params.value === 'boolean' ? params.value : params.value.toLowerCase() === 'true')
  isReady?: boolean;

  @IsDefined()
  @ValidateNested()
  @IsOptional()
  addition?: Addition;
}
