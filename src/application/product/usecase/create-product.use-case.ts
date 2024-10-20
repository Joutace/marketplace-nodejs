import { Inject } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepository } from 'src/infra/repository/product.repository';

export class CreateProductUseCase {
  @Inject(ProductRepository)
  private productRepository: ProductRepository;

  async execute(input: CreateProductDto, userId?: string): Promise<Product> {
    try {
      const newProduct = await this.productRepository.create(input);
      if (!newProduct) {
        throw new Error('Unable to create new product');
      }
      return newProduct;
    } catch (err) {
      throw new Error(err);
    }
  }
}
