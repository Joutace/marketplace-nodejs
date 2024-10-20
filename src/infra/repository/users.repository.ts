import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from 'src/application/user/dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new user
   * @param data
   * @returns User
   */
  async create(data: CreateUserDto): Promise<User> {
    const { password, ...userData } = data;
    return this.prisma.user.create({
      data: {
        ...userData,
        password,
      },
    });
  }

  async delete(currentUserId: string, userId: string) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        updatedBy: currentUserId,
        isDeleted: true,
      },
    });
  }

  async getById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: { Cart: true },
    });
  }
}
