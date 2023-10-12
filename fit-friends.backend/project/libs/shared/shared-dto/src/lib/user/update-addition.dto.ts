import {Role} from '@project/shared-types';
import {fillObject} from '@project/util-core';
import {UpdateCoachDto} from './update-coach.dto';
import {UpdateSportsmanDto} from './update-sportsman.dto';

export type UpdateAdditionDto = UpdateCoachDto | UpdateSportsmanDto;

export const fillUpdateDto: {[x: string]: (object: object) => UpdateAdditionDto} = {
  [Role.coach]: (object: object) => fillObject(UpdateCoachDto, object),
  [Role.sportsman]: (object: object) => fillObject(UpdateSportsmanDto, object),
};
