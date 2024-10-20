import { Inject } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from 'src/infra/repository/users.repository';
import { GetUserDto } from '../dto/get-user.dto';

export class GetUserUseCase {
  @Inject(UserRepository)
  private userRepository: UserRepository;
  async execute(input: GetUserDto): Promise<GetUserOutput> {
    try {
      const user = await this.userRepository.getById(input.id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export type GetUserOutput = User;
