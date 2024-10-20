import { Inject } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from 'src/infra/repository/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateCartUseCase } from 'src/application/cart/usecase/create-cart.use-case';

export class CreateUserUseCase {
  @Inject(UserRepository)
  private userRepository: UserRepository;
  @Inject(CreateCartUseCase)
  private createCartUseCase: CreateCartUseCase;
  async execute(input: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userRepository.create(input);
      if (!newUser) {
        throw new Error('Unable to create new user');
      }
      await this.createCartUseCase.execute({ userId: newUser.id });
      return newUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}
