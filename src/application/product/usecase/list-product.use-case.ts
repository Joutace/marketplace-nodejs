import { Inject } from '@nestjs/common';
import { ProductRepository } from 'src/infra/repository/product.repository';
import { IFilterQuery, SortOrder } from 'src/interface/query.interface';
import { buildQuery } from 'src/shared/query-builder';

export class ListProductUseCase {
  @Inject(ProductRepository)
  private productRepository: ProductRepository;

  async execute(query: IFilterQuery) {
    try {
      const { page, limit, filterBy, filterValue, sortBy, sortOrder } = query;
      const pagination = { page: page || 1, limit: limit || 10 };

      const sorting = {
        sortBy: sortBy || 'name',
        sortOrder: sortOrder !== 'desc' ? SortOrder.ASC : SortOrder.DESC,
      };

      const queryProperties = ['name'];
      const where = buildQuery({ filterBy, filterValue, queryProperties });

      const params = {
        where: { isDeleted: false, ...where },
        orderBy: { [sorting.sortBy]: sorting.sortOrder },
        skip: pagination.limit * (pagination.page - 1),
        take: +pagination.limit,
      };

      const [total, result] = await this.productRepository.list(params);

      return {
        total: total,
        data: result,
        limit: pagination.limit,
        page: pagination.page,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
