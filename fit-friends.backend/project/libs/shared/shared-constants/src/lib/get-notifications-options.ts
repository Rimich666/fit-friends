import {SortOrder} from 'mongoose';

export const GetNotificationsOptions = {
  sort: 'createDate',
  order: 'desc' as SortOrder,
  limit: 5,
  skip: 0
};
