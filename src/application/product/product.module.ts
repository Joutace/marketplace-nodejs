import { Module } from '@nestjs/common';
import { ProductRepository } from 'src/infra/repository/product.repository';
import { PrismaService } from 'src/prisma.service';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from './usecase/create-product.use-case';
import { DeleteProductUseCase } from './usecase/delete-product.use-case';
import { GetProductUseCase } from './usecase/get-product.use-case';
import { ListProductUseCase } from './usecase/list-product.use-case';
import { UpdateProductUseCase } from './usecase/update-product.use-case';

@Module({
  providers: [
    CreateProductUseCase,
    DeleteProductUseCase,
    ListProductUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    ProductRepository,
    PrismaService,
  ],
  exports: [
    CreateProductUseCase,
    DeleteProductUseCase,
    ListProductUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    PrismaService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
