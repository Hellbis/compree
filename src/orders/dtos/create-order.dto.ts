import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class OrderItemDTO {
  @IsUUID()
  productId: string;
  @IsInt()
  amount: number;
}

export class CreateOrderDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OrderItemDTO)
  orderItems: OrderItemDTO[];
}
