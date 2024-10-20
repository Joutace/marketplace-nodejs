import { Module } from '@nestjs/common';
import { ReviewController } from './application/review/review.controller';
import { ProductController } from './application/product/product.controller';
import { PrismaService } from './prisma.service';
import { ReviewModule } from './application/review/review.module';
import { ProductModule } from './application/product/product.module';

@Module({
  imports: [ReviewModule, ProductModule],
  controllers: [ReviewController, ProductController],
  providers: [PrismaService],
})
export class AppModule {}
