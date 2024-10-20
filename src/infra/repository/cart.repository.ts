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
   * Retrieves a Cart by its ID.
   *
   * @param {string} id - The ID of the Cart to be retrieved.
   * @returns {Promise<Cart | null>} - The Cart or null if not found.
   * @throws {InternalServerErrorException} - If an error occurs during retrieval.
   */
  async getById(id: string): Promise<Cart | null> {
    try {
      return await this.prisma.cart.findUnique({
        where: { id },

        include: {
          cartProducts: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error('Error retrieving product by ID', error);
      throw new InternalServerErrorException('Failed to retrieve product');
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
    productId: string,
  ): Promise<CartProduct> {
    try {
      const { quantity, size, color, price } = data;
      return await this.prisma.cartProduct.create({
        data: {
          quantity,
          size,
          color,
          price,
          product: { connect: { id: productId } },
          cart: {
            connect: { id: data.cartId },
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
}
