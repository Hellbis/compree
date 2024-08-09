import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductPropertyDTO, ProductImageDTO } from './create-product.dto';

export class UpdateProductDTO {
  @IsString()
  @IsNotEmpty({ message: "Name can't be empty" })
  @IsOptional()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Min(1, { message: 'Pricing have been must bigger than zero' })
  @IsOptional()
  price: number;

  @IsNumber()
  @Min(0, { message: 'Available quantity have been must bigger than zero' })
  @IsOptional()
  availableQuantity: number;

  @IsString()
  @IsOptional()
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductPropertyDTO)
  @IsOptional()
  properties: ProductPropertyDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  @IsOptional()
  images: ProductImageDTO[];

  @IsString()
  @IsNotEmpty({ message: "Category can't be empty" })
  @IsOptional()
  category: string;
}
