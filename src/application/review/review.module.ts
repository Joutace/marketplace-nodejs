import { Module } from '@nestjs/common';
import { ReviewRepository } from 'src/infra/repository/review.repository';
import { PrismaService } from 'src/prisma.service';
import { ReviewController } from './review.controller';
import { CreateReviewUseCase } from './usecase/create-review.use-case';
import { DeleteReviewUseCase } from './usecase/delete-review.use-case';
import { ListReviewUseCase } from './usecase/list-review.use-case';

@Module({
  providers: [
    CreateReviewUseCase,
    DeleteReviewUseCase,
    ListReviewUseCase,
    ReviewRepository,
    PrismaService,
  ],
  exports: [
    CreateReviewUseCase,
    DeleteReviewUseCase,
    ListReviewUseCase,
    PrismaService,
  ],
  controllers: [ReviewController],
})
export class ReviewModule {}
