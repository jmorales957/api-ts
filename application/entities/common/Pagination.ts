export type PaginationParams = {
  page: number;
  limit: number;
  search?: string;
  sort?: any;
};

export interface PaginatedResult<T> {
  results: T[];
  page: number;
  pages: number;
  total: number;
  limit: number;
}
