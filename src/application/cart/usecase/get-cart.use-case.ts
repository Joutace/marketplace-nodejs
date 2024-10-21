import { Inject } from '@nestjs/common';
import { CartRepository } from 'src/infra/repository/cart.repository';
import { GetCartDto } from '../dto/get-cart-products.dto';

export class GetCartUseCase {
  @Inject(CartRepository)
  private repository: CartRepository;
  async execute(input: GetCartDto) {
    try {
      const cart = await this.repository.getById(input.id);
      if (!cart) {
        throw new Error('Cart not found');
      }
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }
}
