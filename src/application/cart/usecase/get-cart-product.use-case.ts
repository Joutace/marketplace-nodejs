import { Inject } from '@nestjs/common';
import { GetCartDto } from '../dto/get-cart-products.dto';
import { CartRepository } from 'src/infra/repository/cart.repository';

export class GetProductUseCase {
  @Inject(CartRepository)
  private repository: CartRepository;
  async execute(input: GetCartDto) {
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
