import { Discount, ProductMetadata, SocialMedia } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsArray,
  IsDate,
} from 'class-validator';

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

  @ValidateNested()
  discount: Discount;

  @ValidateNested()
  socials: SocialMedia;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @ValidateNested({ each: true })
  metadata: ProductMetadata[];

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt?: Date;
}
