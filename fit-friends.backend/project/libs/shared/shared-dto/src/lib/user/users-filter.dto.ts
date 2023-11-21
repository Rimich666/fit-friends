import {IsEnum, IsOptional} from 'class-validator';
import {
  DefaultSort,
  Level,
  TrainingType,
  UserLocation, UsersSortFieldsEnum,
} from '@project/shared-types';
import {FilterDto} from '../filter.dto';
import {Transform} from 'class-transformer';

export class UsersFilterDto extends FilterDto {
  @IsOptional()
  @IsEnum(UsersSortFieldsEnum)
  public sort: string = DefaultSort.FIELD;

  @IsOptional()
  @IsEnum(Level)
  public level: Level;

  @IsOptional()
  @IsEnum(TrainingType, {each: true})
  @Transform((params) => params.value.split(','))
  public trainingType: TrainingType[];

  @IsOptional()
  @IsEnum(UserLocation, {each: true})
  @Transform((params) => params.value.split(','))
  public location: UserLocation[];
}
