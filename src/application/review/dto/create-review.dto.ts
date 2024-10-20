import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  review: number;

  @IsString()
  @MaxLength(500)
  reviewMessage: string;

  @IsOptional()
  @IsString()
  productId?: string;
}
