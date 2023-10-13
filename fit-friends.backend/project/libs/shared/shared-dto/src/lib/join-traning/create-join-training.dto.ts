import {IsMongoId} from 'class-validator';

export class CreateJoinTrainingDto {
  @IsMongoId()
  public invitedId: string;
}
