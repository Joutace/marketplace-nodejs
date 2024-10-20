import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveCartProductDto {
  @IsUUID()
  @IsNotEmpty()
  cartId: string;

  @IsNotEmpty()
  cartProductId: string;
}
