import {IsMongoId} from 'class-validator';

export class SubscribeDto {
  @IsMongoId()
  coachId?: string;
}
