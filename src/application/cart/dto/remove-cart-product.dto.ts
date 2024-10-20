import { IsNotEmpty } from 'class-validator';

export class RemoveCartProductDto {
  @IsNotEmpty()
  cartId: string;

  @IsNotEmpty()
  cartProductId: string;
}
