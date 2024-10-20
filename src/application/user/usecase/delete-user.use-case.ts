import { Inject } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUserUseCase } from './get-user.use-case';
import { UserRepository } from 'src/infra/repository/users.repository';
import { DeleteUserDto } from '../dto/delete-user.dto';

export class DeleteUserUseCase {
  constructor() {}
  @Inject(UserRepository)
  private userRepository: UserRepository;

  @Inject(GetUserUseCase)
  private getUser: GetUserUseCase;

  async execute(currentUserId: string, input: DeleteUserDto): Promise<User> {
    try {
      const user = await this.getUser.execute(input);
      if (!user) {
        throw new Error('Usuário a ser deletado não encontrado');
      }
      const deletedUser = await this.userRepository.delete(
        currentUserId,
        input.id,
      );
      return deletedUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}
