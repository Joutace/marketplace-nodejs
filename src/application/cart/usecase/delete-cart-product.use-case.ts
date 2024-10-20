import { Inject } from '@nestjs/common';
import { CartProduct } from '@prisma/client';
import { CartRepository } from 'src/infra/repository/cart.repository';
import { RemoveCartProductDto } from '../dto/remove-cart-product.dto';

export class DeleteCartProductUseCase {
  constructor() {}
  @Inject(CartRepository)
  private repository: CartRepository;

  async execute(input: RemoveCartProductDto): Promise<CartProduct> {
    try {
      const deletedProduct = await this.repository.removeProduct(input);
      return deletedProduct;
    } catch (err) {
      throw new Error(err);
    }
  }
}
