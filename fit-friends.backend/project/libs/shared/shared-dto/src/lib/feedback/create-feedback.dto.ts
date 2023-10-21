import {IsInt, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {validationConstraints} from '@project/shared-constants';

export class CreateFeedbackDto {
  @IsInt()
  trainingId: number;

  @IsInt()
  @Min(validationConstraints.feedback.rating.min)
  @Max(validationConstraints.feedback.rating.max)
  rating: number;

  @IsString()
  @MinLength(validationConstraints.feedback.text.min)
  @MaxLength(validationConstraints.feedback.text.max)
  text: string;
}
