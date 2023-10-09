import {IsEnum, IsOptional} from 'class-validator';
import {
  Level,
  TrainingType,
  UserLocation,
} from '@project/shared-types';
import {FilterDto} from './filter.dto';

export class UsersFilterDto extends FilterDto {
  @IsOptional()
  @IsEnum(Level)
  public level: Level;

  @IsOptional()
  @IsEnum(TrainingType)
  public trainingType: TrainingType;

  @IsOptional()
  @IsEnum(UserLocation)
  public location: UserLocation;
}
