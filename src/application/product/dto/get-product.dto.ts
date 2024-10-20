import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetProductDto {
  @IsNotEmpty()
  id: string;
}
