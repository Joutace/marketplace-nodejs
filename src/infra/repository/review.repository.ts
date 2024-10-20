import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Review } from '@prisma/client';
import { CreateReviewDto } from 'src/application/review/dto/create-review.dto';
import { ISearchParams } from 'src/interface/query.interface';
import { PrismaService } from '../../prisma.service';
import { DeleteReviewDto } from 'src/application/review/dto/delete-review.dto';

@Injectable()
export class ReviewRepository {
  private readonly logger = new Logger(ReviewRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new review.
   *
   * @param {CreateReviewDto} review - The review data to be created.
   * @returns {Promise<Review>} - The created review.
   * @throws {InternalServerErrorException} - If an error occurs during the creation.
   */
  async create(review: CreateReviewDto): Promise<Review> {
    try {
      const { productId, ...reviewData } = review;
      return await this.prisma.review.create({
        data: {
          ...reviewData,
          Product: {
            connect: { id: productId },
          },
        },
      });
    } catch (error) {
      this.logger.error('Error creating review', error);
      throw new InternalServerErrorException('Failed to create review');
    }
  }

  /**
   * Deletes a review.
   *
   * @param {DeleteReview} reviewData - The review data to be deleted.
   * @returns {Promise<Review>} - The deleted review.
   * @throws {InternalServerErrorException} - If an error occurs during the deletion.
   */
  async delete(reviewData: DeleteReviewDto): Promise<Review> {
    try {
      return await this.prisma.review.delete({
        where: { id: reviewData.id },
      });
    } catch (error) {
      this.logger.error('Error deleting review', error);
      throw new InternalServerErrorException('Failed to delete review');
    }
  }

  /**
   * Lists reviews based on the search parameters.
   *
   * @param {ISearchParams} params - The search parameters (filter, pagination, ordering).
   * @returns {Promise<[number, Review[]]>} - The total count and the list of reviews.
   * @throws {InternalServerErrorException} - If an error occurs during the search.
   */
  async list(params: ISearchParams): Promise<[number, Review[]]> {
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
        this.prisma.review.count({ where: params.where }),
        this.prisma.review.findMany(findManyParams),
      ]);
    } catch (error) {
      this.logger.error('Error listing reviews', error);
      throw new InternalServerErrorException('Failed to list reviews');
    }
  }
}
