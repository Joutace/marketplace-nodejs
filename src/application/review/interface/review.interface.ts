import { Review } from '@prisma/client';
import { CreateReviewDto } from 'src/application/review/dto/create-review.dto';
import { ISearchParams } from 'src/interface/query.interface';
import { DeleteReviewDto } from '../dto/delete-review.dto';

export interface IReviewRepository {
  /**
   * Creates a new review.
   *
   * @param {CreateReviewDto} review - The review data to be created.
   * @returns {Promise<Review>} - The created review.
   */
  create(review: CreateReviewDto): Promise<Review>;

  /**
   * Deletes a review.
   *
   * @param {DeleteReview} reviewData - The review data to be deleted.
   * @returns {Promise<Review>} - The deleted review.
   */
  delete(reviewData: DeleteReviewDto): Promise<Review>;

  /**
   * Lists reviews based on the search parameters.
   *
   * @param {ISearchParams} params - The search parameters (filter, pagination, ordering).
   * @returns {Promise<[number, Review[]]>} - The total count and the list of reviews.
   */
  list(params: ISearchParams): Promise<[number, Review[]]>;
}
