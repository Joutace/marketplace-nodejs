import { Discount, ProductMetadata, SocialMedia } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator';
import { ProductVariantDto } from './create-product.dto';

export class UpdateProductDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  shortDescription: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  cardDescription: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  aditionalInfo: string;

  @IsString()
  @IsOptional()
  mainImage: string;

  @ValidateNested()
  @IsObject()
  discount: Discount;

  @ValidateNested()
  @IsObject()
  socials?: SocialMedia;

  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ProductVariantDto)
  variants?: ProductVariantDto[];

  @ValidateNested({ each: true })
  @IsArray()
  metadata?: ProductMetadata[];
}
