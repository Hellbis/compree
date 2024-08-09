import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductEntity } from '../product.entity';

export class ProductPropertyDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: "Property name can't be empty" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "Property description can't be empty" })
  description: string;

  product: ProductEntity;
}

export class ProductImageDTO {
  id: string;

  @IsUrl({ message: 'URL is invalid' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: "Image description can't be empty" })
  description: string;

  product: ProductEntity;
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: "Name can't be empty" })
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'Pricing have been must bigger than zero' })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Available quantity have been must bigger than zero' })
  availableQuantity: number;

  @IsString()
  @IsNotEmpty({ message: "Description can't be empty" })
  @MaxLength(1000, {
    message: 'Description must be less than 1000 caracters',
  })
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductPropertyDTO)
  properties: ProductPropertyDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsString()
  @IsNotEmpty({ message: "Category can't be empty" })
  category: string;
}
