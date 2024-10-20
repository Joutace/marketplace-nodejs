import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteUserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
