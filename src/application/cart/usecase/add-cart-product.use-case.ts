import { Inject } from '@nestjs/common';
import { CartProduct } from '@prisma/client';
import { AddCartProductDto } from '../dto/add-cart-product.dto';
import { CartRepository } from './../../../infra/repository/cart.repository';

export class AddCartProductUseCase {
  @Inject(CartRepository)
  private repository: CartRepository;

  async execute(
    input: AddCartProductDto,
    cartId: string,
  ): Promise<CartProduct> {
    try {
      const data = { ...input };
      const newCartProduct = await this.repository.addProductToCart(
        data,
        cartId,
      );
      if (!newCartProduct) {
        throw new Error('Unable to add product to cart');
      }
      return newCartProduct;
    } catch (err) {
      throw new Error(err);
    }
  }
}
