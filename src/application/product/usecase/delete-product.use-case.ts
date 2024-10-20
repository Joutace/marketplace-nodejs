import { Product } from '@prisma/client';
import { GetProductUseCase } from './get-product.use-case';
import { Inject } from '@nestjs/common';
import { DeleteProductDto } from '../dto/delete-product.dto';
import { ProductRepository } from 'src/infra/repository/product.repository';

export class DeleteProductUseCase {
  constructor() {}
  @Inject(ProductRepository)
  private productService: ProductRepository;

  @Inject(GetProductUseCase)
  private getProduct: GetProductUseCase;

  async execute(userId: string, input: DeleteProductDto): Promise<Product> {
    try {
      const product = await this.getProduct.execute(input);

      if (!product) {
        throw new Error('Produto a ser deletado não encontrado');
      }
      const deletedProduct = await this.productService.delete(
        product.id,
        userId,
      );
      return deletedProduct;
    } catch (err) {
      throw new Error(err);
    }
  }
}
