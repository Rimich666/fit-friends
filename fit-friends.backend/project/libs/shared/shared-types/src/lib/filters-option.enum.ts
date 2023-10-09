export enum UsersSortFieldsEnum {
  createDate = 'createDate',
  role = 'role'
}

export enum Order {
  asc = 'asc',
  desc = 'desc'
}

// export const getSortNames =
//   () => Object.values(SortFieldsEnum).filter((item) => isNaN(Number(item)))

export const DefaultSort = {
  FIELD: UsersSortFieldsEnum.createDate,
  ORDER: Order.desc
};

export const RESPONSE_PAGE_LIMIT = 50;
