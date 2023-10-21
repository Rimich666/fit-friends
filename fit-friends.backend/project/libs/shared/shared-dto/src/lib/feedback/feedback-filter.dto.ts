import {FilterDto} from '../filter.dto';
import {DefaultSort} from '@project/shared-types';
import {Expose, Transform} from 'class-transformer';

export class FeedbackFilterDto extends FilterDto {
  @Expose()
  @Transform((params) =>
    params.value ? params.value : DefaultSort.FIELD)
  public sort: string = DefaultSort.FIELD;

  @Expose()
  @Transform((params) => parseInt(params.value, 10))
  public trainingId: number;
}
