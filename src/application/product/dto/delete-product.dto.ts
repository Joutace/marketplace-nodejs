import { IsNotEmpty } from 'class-validator';

export class DeleteProductDto {
  @IsNotEmpty()
  id: string;
}
