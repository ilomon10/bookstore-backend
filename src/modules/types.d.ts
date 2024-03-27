export interface IQueryFilter {
  [key: string]: any;
}

export interface IQueryPagination {
  $limit: number;
  $skip: number;
  $total: number;
}

export interface GetManyResponse<TData> {
  data: TData[];
  total: number;
  limit: number;
  skip: number;
}
