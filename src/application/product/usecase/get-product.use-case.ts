import { Inject } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductRepository } from 'src/infra/repository/product.repository';
import { GetProductDto } from '../dto/get-product.dto';

export class GetProductUseCase {
  @Inject(ProductRepository)
  private repository: ProductRepository;
  async execute(input: GetProductDto) {
    try {
      const product = await this.repository.getById(input.id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export type GetProductOutput = Product & { events: Event };
