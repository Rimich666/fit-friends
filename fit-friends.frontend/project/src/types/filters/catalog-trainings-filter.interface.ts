export type CatalogTrainingsFilterInterface = {
  type?: string[];
  priceMin?: number;
  priceMax?: number;
  ratingMin?: number;
  ratingMax?: number;
  caloriesMin?: number;
  caloriesMax?: number;
  page: number;
  trainingType?: string[];
  sort?: string;
  order?: string;
}
