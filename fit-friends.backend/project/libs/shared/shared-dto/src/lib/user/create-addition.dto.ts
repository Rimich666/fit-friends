import {CreateCoachDto} from './create-coach.dto';
import {CreateSportsmanDto} from './create-sportsman.dto';
import {Role} from '@project/shared-types';
import {fillObject} from '@project/util-core';

export type CreateAdditionDto = CreateCoachDto | CreateSportsmanDto;

export const fillCreateDto: {[x: string]: (object: object) => CreateAdditionDto} = {
  [Role.coach]: (object: object) => fillObject(CreateCoachDto, object),
  [Role.sportsman]: (object: object) => fillObject(CreateSportsmanDto, object),
};
