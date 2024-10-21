import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartController } from './cart.controller';
import { AddCartProductUseCase } from './usecase/add-cart-product.use-case';
import { CreateCartUseCase } from './usecase/create-cart.use-case';
import { DeleteCartProductUseCase } from './usecase/delete-cart-product.use-case';
import { CartRepository } from 'src/infra/repository/cart.repository';
import { GetProductUseCase } from '../product/usecase/get-product.use-case';
import { ProductRepository } from 'src/infra/repository/product.repository';
import { GetCartUseCase } from './usecase/get-cart.use-case';

@Module({
  providers: [
    GetCartUseCase,
    DeleteCartProductUseCase,
    CreateCartUseCase,
    PrismaService,
    AddCartProductUseCase,
    CartRepository,
    GetProductUseCase,
    ProductRepository,
  ],
  exports: [
    GetCartUseCase,
    GetProductUseCase,
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
