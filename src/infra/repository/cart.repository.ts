import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cart, CartProduct, Prisma } from '@prisma/client';
import { CreateCartDto } from 'src/application/cart/dto/create-cart.dto';
import { RemoveCartProductDto } from 'src/application/cart/dto/remove-cart-product.dto';
import { ISearchParams } from 'src/interface/query.interface';
import { PrismaService } from '../../prisma.service';
import { AddCartProductDto } from 'src/application/cart/dto/add-cart-product.dto';

@Injectable()
export class CartRepository {
  private readonly logger = new Logger(CartRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new cart.
   *
   * @param {CreateCartDto} cart - The cart data to be created.
   * @returns {Promise<Cart>} - The created cart.
   * @throws {InternalServerErrorException} - If an error occurs during the creation.
   */
  async create(cart: CreateCartDto): Promise<Cart> {
    try {
      return await this.prisma.cart.create({
        data: {
          user: {
            connect: { id: cart.userId },
          },
        },
      });
    } catch (error) {
      this.logger.error('Error creating cart', error);
      throw new InternalServerErrorException('Failed to create cart');
    }
  }

  /**
   * Adds a product to the cart. If the cart does not exist, it creates a new one.
   *
   * @param userId - The ID of the user.
   * @param productId - The ID of the product to add.
   * @param quantity - The quantity to add.
   * @returns {Promise<CartProduct>} - The added or updated CartProduct entry.
   */
  async addProductToCart(
    data: AddCartProductDto,
    cartId: string,
  ): Promise<CartProduct> {
    try {
      return await this.prisma.cartProduct.create({
        data: {
          ...data,
          cart: {
            connect: { id: cartId },
          },
        },
      });
    } catch (error) {
      this.logger.error('Error adding product to cart', error);
      throw new InternalServerErrorException('Failed to add product to cart');
    }
  }

  /**
   * Deletes a cart product.
   *
   * @param {RemoveCartProductDto} productData - The cart data to be deleted.
   * @returns {Promise<CartProduct>} - The deleted cart.
   * @throws {InternalServerErrorException} - If an error occurs during the deletion.
   */
  async removeProduct(productData: RemoveCartProductDto): Promise<CartProduct> {
    try {
      return await this.prisma.cartProduct.delete({
        where: { id: productData.cartProductId },
      });
    } catch (error) {
      this.logger.error('Error deleting cart', error);
      throw new InternalServerErrorException('Failed to delete cart');
    }
  }

  /**
   * Lists carts based on the search parameters.
   *
   * @param {ISearchParams} params - The search parameters (filter, pagination, ordering).
   * @returns {Promise<[number, Cart[]]>} - The total count and the list of carts.
   * @throws {InternalServerErrorException} - If an error occurs during the search.
   */
  async list(params: ISearchParams): Promise<[number, Cart[]]> {
    try {
      const findManyParams: ISearchParams = {
        skip: params.skip,
        take: params.take,
        where: params.where,
        orderBy: params.orderBy,
      };

      if (params.include) {
        findManyParams.include = params.include;
      } else if (params.select) {
        findManyParams.select = params.select;
      }

      return await this.prisma.$transaction([
        this.prisma.cart.count({ where: params.where }),
        this.prisma.cart.findMany(findManyParams),
      ]);
    } catch (error) {
      this.logger.error('Error listing carts', error);
      throw new InternalServerErrorException('Failed to list carts');
    }
  }
}
