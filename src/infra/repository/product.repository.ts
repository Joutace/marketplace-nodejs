import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ISearchParams } from 'src/interface/query.interface';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductRepository {
  private readonly logger = new Logger(ProductRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new product.
   *
   * @param {Prisma.ProductCreateInput} input - The product data to be created.
   * @returns {Promise<Product>} - The created product.
   * @throws {InternalServerErrorException} - If an error occurs during product creation.
   */
  async create(input: Prisma.ProductCreateInput): Promise<Product> {
    try {
      return await this.prisma.product.create({ data: input });
    } catch (error) {
      this.logger.error('Error creating product', error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  /**
   * Updates an existing product.
   *
   * @param {string} id - The ID of the product to be updated.
   * @param {Prisma.ProductUpdateInput} data - The new product data.
   * @returns {Promise<Product>} - The updated product.
   * @throws {InternalServerErrorException} - If an error occurs during product update.
   */
  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.logger.error('Error updating product', error);
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  /**
   * Marks a product as deleted (soft delete).
   *
   * @param {string} id - The ID of the product to be deleted.
   * @param {string} userId - The ID of the user performing the deletion.
   * @returns {Promise<Product>} - The updated product marked as deleted.
   * @throws {InternalServerErrorException} - If an error occurs during product deletion.
   */
  async delete(id: string, userId: string): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      this.logger.error('Error deleting product', error);
      throw new InternalServerErrorException('Failed to delete product');
    }
  }

  /**
   * Retrieves a product by its ID.
   *
   * @param {string} id - The ID of the product to be retrieved.
   * @returns {Promise<Product | null>} - The product or null if not found.
   * @throws {InternalServerErrorException} - If an error occurs during retrieval.
   */
  async getById(id: string): Promise<Product | null> {
    try {
      return await this.prisma.product.findUnique({
        where: { id },
        include: { reviews: true },
      });
    } catch (error) {
      this.logger.error('Error retrieving product by ID', error);
      throw new InternalServerErrorException('Failed to retrieve product');
    }
  }

  /**
   * Lists products based on search parameters.
   *
   * @param {ISearchParams} params - Search parameters (pagination, filters, sorting).
   * @returns {Promise<[number, Product[]]>} - The total count and list of products.
   * @throws {InternalServerErrorException} - If an error occurs during listing.
   */
  async list(params: ISearchParams): Promise<[number, Product[]]> {
    try {
      return await this.prisma.$transaction([
        this.prisma.product.count({ where: params.where }),
        this.prisma.product.findMany({
          skip: params.skip,
          take: params.take,
          where: params.where,
          orderBy: params.orderBy,
          include: params.include,
        }),
      ]);
    } catch (error) {
      this.logger.error('Error listing products', error);
      throw new InternalServerErrorException('Failed to list products');
    }
  }
}
