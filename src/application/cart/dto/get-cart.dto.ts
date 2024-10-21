import { IsNotEmpty } from 'class-validator';

export class GetCartDto {
  @IsNotEmpty()
  id: string;
}
