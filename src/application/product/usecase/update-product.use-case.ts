import { Inject } from '@nestjs/common';
import { Product } from '@prisma/client';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from 'src/infra/repository/product.repository';

export class UpdateProductUseCase {
  @Inject(ProductRepository)
  private repository: ProductRepository;

  async execute(
    productId: string,
    input: UpdateProductDto,
    userId: string,
  ): Promise<Product> {
    try {
      const data = { ...input };
      return await this.repository.update(productId, data);
    } catch (err) {
      throw new Error(err);
    }
  }
}
