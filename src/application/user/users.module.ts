import { Module } from '@nestjs/common';
import { UserRepository } from 'src/infra/repository/users.repository';
import { PrismaService } from 'src/prisma.service';
import { CreateUserUseCase } from './usecase/create-user.use-case';
import { UserController } from './users.controller';
import { CreateCartUseCase } from '../cart/usecase/create-cart.use-case';
import { CartRepository } from 'src/infra/repository/cart.repository';
import { DeleteUserUseCase } from './usecase/delete-user.use-case';
import { GetUserUseCase } from './usecase/get-user.use-case';

@Module({
  providers: [
    UserRepository,
    PrismaService,
    CreateCartUseCase,
    CartRepository,
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserUseCase,
  ],
  exports: [
    GetUserUseCase,
    PrismaService,
    CreateUserUseCase,
    DeleteUserUseCase,
  ],
  controllers: [UserController],
})
export class UsersModule {}
