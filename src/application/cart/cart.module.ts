import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartController } from './cart.controller';
import { AddCartProductUseCase } from './usecase/add-cart-product.use-case';
import { CreateCartUseCase } from './usecase/create-cart.use-case';
import { DeleteCartProductUseCase } from './usecase/delete-cart-product.use-case';
import { CartRepository } from 'src/infra/repository/cart.repository';

@Module({
  providers: [
    DeleteCartProductUseCase,
    CreateCartUseCase,
    PrismaService,
    AddCartProductUseCase,
    CartRepository,
  ],
  exports: [
    CartRepository,
    CreateCartUseCase,
    DeleteCartProductUseCase,
    AddCartProductUseCase,
    DeleteCartProductUseCase,
    PrismaService,
  ],
  controllers: [CartController],
})
export class CartModule {}
