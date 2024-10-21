import { Discount, ProductMetadata, SocialMedia } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class SizeStockDto {
  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class ProductVariantDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsArray()
  @ValidateNested({ each: true })
  sizes: SizeStockDto[];
}

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  cardDescription: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  aditionalInfo: string;

  @IsString()
  @IsNotEmpty()
  mainImage: string;

  @ValidateNested()
  @IsObject()
  discount: Discount;

  @ValidateNested()
  @IsObject()
  socials: SocialMedia;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];

  @ValidateNested({ each: true })
  @IsArray()
  metadata: ProductMetadata[];

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt?: Date;
}
