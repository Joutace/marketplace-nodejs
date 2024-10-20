import { Inject } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { CartRepository } from 'src/infra/repository/cart.repository';
import { CreateCartDto } from '../dto/create-cart.dto';

export class CreateCartUseCase {
  @Inject(CartRepository)
  private repository: CartRepository;

  async execute(input: CreateCartDto): Promise<Cart> {
    try {
      const newCart = await this.repository.create(input);
      if (!newCart) {
        throw new Error('Unable to create new cart');
      }
      return newCart;
    } catch (err) {
      throw new Error(err);
    }
  }
}
