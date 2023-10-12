import {IsMongoId, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import {Expose} from 'class-transformer';
import {validationConstraints} from '@project/shared-constants';

export class UpdateCoachDto {
  @IsMongoId()
  @Expose()
  @IsOptional()
  public certificateId?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MinLength(validationConstraints.user.merits.min)
  @MaxLength(validationConstraints.user.merits.max)
  public merits?: string;
}
