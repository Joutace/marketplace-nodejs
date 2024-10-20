import { Inject } from '@nestjs/common';
import { Review } from '@prisma/client';
import { ReviewRepository } from 'src/infra/repository/review.repository';
import { DeleteReviewDto } from '../dto/delete-review.dto';

export class DeleteReviewUseCase {
  @Inject(ReviewRepository)
  private repository: ReviewRepository;

  async execute(reviewData: DeleteReviewDto): Promise<Review> {
    return this.repository.delete(reviewData);
  }
}
