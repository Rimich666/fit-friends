import {Static} from '@project/shared-constants';
import {getRandomFile} from '@project/util-core';

export const getBackgroundFile = async (endpoint: string) => {
  return getRandomFile(`${Static.ROOT_PATH}/${endpoint}`);
};
