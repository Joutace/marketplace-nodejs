import { BadRequestException, Inject } from '@nestjs/common';
import { Review } from '@prisma/client';
import { ReviewRepository } from 'src/infra/repository/review.repository';
import { CreateReviewDto } from '../dto/create-review.dto';

export class CreateReviewUseCase {
  @Inject(ReviewRepository)
  private reviewRepository: ReviewRepository;

  constructor() {}

  async execute(userId: string, input: CreateReviewDto): Promise<Review> {
    try {
      const data = {
        ...input,
        createdBy: userId,
      };
      const newReview = await this.reviewRepository.create(data);
      if (!newReview) {
        throw new Error('Unable to create new review');
      }

      return newReview;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
}
