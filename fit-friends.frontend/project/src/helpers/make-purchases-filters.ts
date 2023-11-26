import {LIMIT} from '../settings';
import {PurchasesVariant} from '../enums';

type PurchasesOptions = {
    variant: PurchasesVariant;
    param: string;
  }
export const makePurchasesFilters = (page: number, isActive: boolean): PurchasesOptions => ({
  variant: isActive ? PurchasesVariant.active : PurchasesVariant.noActive,
  param: `page=${page}&limit=${LIMIT}`
});
