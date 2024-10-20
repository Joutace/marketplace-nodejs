import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCartProductDto {
  @IsNumber()
  @IsNotEmpty()
  cartId: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
