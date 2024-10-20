import { IQuery, QueryFilterTypes } from 'src/interface/query.interface';

export function buildQuery(query: IQuery) {
  const { filterBy, filterValue, queryProperties } = query;
  if (!filterBy || !filterValue) {
    return {};
  }
  if (filterBy === QueryFilterTypes.ALL) {
    return {
      OR: queryProperties.map((property) => {
        return {
          [property]: {
            contains: filterValue,
            mode: 'insensitive',
          },
        };
      }),
    };
  }

  return {
    [filterBy]: {
      contains: filterValue,
      mode: 'insensitive',
    },
  };
}
