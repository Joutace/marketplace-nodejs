import { Discount, ProductMetadata, SocialMedia } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

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
  aditionalInfo?: string;

  @IsString()
  @ValidateNested()
  discount: Discount;

  @IsString()
  @ValidateNested()
  socials: SocialMedia;

  @IsString()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsString()
  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @IsString()
  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @IsString()
  @ValidateNested({ each: true })
  metadata: ProductMetadata[];

  @IsString()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date;
}
