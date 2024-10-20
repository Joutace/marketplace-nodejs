export interface IFilterList {
  pagination: IPagination;
  query?: IQuery;
  sorting?: ISortOptions;
}

export class IOptionalQuery {
  take?: number;
}

export interface IFilterQuery {
  page: number;
  limit: number;
  filterBy?: string;
  filterValue?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IQuery {
  filterBy: string;
  filterValue: string;
  queryProperties?: string[];
  tagType?: string;
}

interface ISortOptions {
  sortBy: string;
  sortOrder: SortOrder;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

interface IPagination {
  page: number;
  limit: number;
  total?: number;
  search?: string;
  elements?: any[];
}

export enum QueryFilterTypes {
  ALL = 'ALL',
  NAME = 'name',
  CREATED = 'createdAt',
}

export interface ListParams {
  where: any;
  skip: number;
  take: number;
  include?: any;
  orderBy: any;
}

export interface ISearchParams {
  include?: any;
  select?: any;
  where: any;
  orderBy: {
    [key: string]: SortOrder;
  };
  skip: number;
  take: number;
}

export interface IOptionalSearchParams {
  include?: any;
  where?: any;
  orderBy?: {
    [x: string]: SortOrder;
  };
  skip?: number;
  take?: number;
}
