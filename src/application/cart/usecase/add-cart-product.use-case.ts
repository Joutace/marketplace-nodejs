import { Inject } from '@nestjs/common';
import { CartProduct, Product } from '@prisma/client';
import { AddCartProductDto } from '../dto/add-cart-product.dto';
import { CartRepository } from './../../../infra/repository/cart.repository';
import { GetProductUseCase } from 'src/application/product/usecase/get-product.use-case';

export class AddCartProductUseCase {
  @Inject(CartRepository)
  private repository: CartRepository;
  @Inject(GetProductUseCase)
  private getProduct: GetProductUseCase;

  async execute(
    input: AddCartProductDto,
    productId: string,
  ): Promise<CartProduct> {
    try {
      const data = { ...input };
      const product = await this.getProduct.execute({ id: productId });
      if (!product) {
        throw new Error(
          'Unable to add product to cart, the product does not exists',
        );
      }

      const { variants } = product;
      const variant = variants.find((v) => v.color === input.color);
      if (!variant) {
        throw new Error('This color is out of stock');
      }
      const sizeStock = variant.sizes.find((s) => s.size === input.size);

      if (!sizeStock) {
        throw new Error('This product is out of stock');
      }

      if (sizeStock.amount < input.quantity) {
        throw new Error('The selected amount is greater than product stock');
      }

      const newCartProduct = await this.repository.addProductToCart(
        data,
        productId,
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
