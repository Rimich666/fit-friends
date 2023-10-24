export enum UsersSortFieldsEnum {
  createDate = 'createDate',
  role = 'role'
}

export enum CoachTrainingSortFieldsEnum {
  createDate = 'createDate',

}

export enum SharedTrainingSortFieldsEnum {
  createDate = 'createDate',
  price = 'price'
}

export enum OrderSortFieldsEnum {
  createDate = 'createDate',
  count = 'count',
  total = 'total'
}

export enum Order {
  asc = 'asc',
  desc = 'desc'
}

export const DefaultSort = {
  FIELD: 'createDate',
  ORDER: Order.desc
};

export const RESPONSE_PAGE_LIMIT = 50;
