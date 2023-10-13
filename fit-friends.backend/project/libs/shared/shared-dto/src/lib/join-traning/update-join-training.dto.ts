import {IsEnum, IsMongoId} from 'class-validator';
import {RequestState} from '@project/shared-types';

export class UpdateJoinTrainingDto {
  @IsMongoId()
  id: string;

  @IsEnum(RequestState)
  state: string;
}
