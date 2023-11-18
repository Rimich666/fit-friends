import {IsMongoId, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import {validationConstraints} from '@project/shared-constants';
import {Expose} from 'class-transformer';

export class CreateCoachDto {
  @IsMongoId({
    each: true,
  })
  @Expose()
  public certificateId: string[];

  @Expose()
  @IsOptional()
  @IsString()
  @MinLength(validationConstraints.user.merits.min)
  @MaxLength(validationConstraints.user.merits.max)
  public merits: string;
}
