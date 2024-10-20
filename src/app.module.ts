import { Module } from '@nestjs/common';
import { ReviewController } from './application/review/review.controller';
import { ProductController } from './application/product/product.controller';
import { PrismaService } from './prisma.service';
import { ReviewModule } from './application/review/review.module';
import { ProductModule } from './application/product/product.module';
import { UserController } from './application/user/users.controller';
import { CartController } from './application/cart/cart.controller';
import { UsersModule } from './application/user/users.module';
import { CartModule } from './application/cart/cart.module';

@Module({
  imports: [ReviewModule, ProductModule, CartModule, UsersModule],
  controllers: [
    ReviewController,
    ProductController,
    UserController,
    CartController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
