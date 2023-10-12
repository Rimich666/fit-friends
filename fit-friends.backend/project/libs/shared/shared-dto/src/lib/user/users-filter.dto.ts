import {IsEnum, IsOptional} from 'class-validator';
import {
  DefaultSort,
  Level,
  TrainingType,
  UserLocation, UsersSortFieldsEnum,
} from '@project/shared-types';
import {FilterDto} from '../filter.dto';

export class UsersFilterDto extends FilterDto {
  @IsOptional()
  @IsEnum(UsersSortFieldsEnum)
  public sort: string = DefaultSort.FIELD;

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
