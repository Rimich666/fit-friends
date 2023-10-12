import {
  ArrayMaxSize,
  IsBoolean,
  IsDate, IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength, ValidateNested
} from 'class-validator';
import {validationConstraints} from '@project/shared-constants';
import {Addition, Gender, Level, Role, TrainingType, UserLocation} from '@project/shared-types';
import {Transform} from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(validationConstraints.user.name.min)
  @MaxLength(validationConstraints.user.name.max)
  public name: string;

  @IsString()
  @MinLength(validationConstraints.user.password.min)
  @MaxLength(validationConstraints.user.password.max)
  public password: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  public avatarId: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  @IsOptional()
  @Transform(params => new Date(params.value))
  birthDate: Date;

  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsOptional()
  @MinLength(validationConstraints.user.description.min)
  @MaxLength(validationConstraints.user.description.max)
  description: string;

  @IsEnum(UserLocation)
  location: UserLocation;

  @IsString()
  imagePath: string;

  @IsEnum(Level)
  level: Level;

  @IsEnum(TrainingType, {each: true})
  @ArrayMaxSize(validationConstraints.user.trainingType.max)
  trainingType: TrainingType[];

  @IsBoolean()
  @Transform(params => params.value.toLowerCase() === 'true')
  isReady: boolean;

  @IsDefined()
  @ValidateNested()
  addition: Addition;
}
