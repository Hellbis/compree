import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UpdateProductDTO } from './dtos/update-product.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() productData: CreateProductDTO) {
    const result = await this.productsService.create(productData);

    return {
      message: 'Product has been created.',
      product: result,
    };
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    const result = await this.productsService.update(id, productData);

    return {
      message: 'Product has been updated',
      product: result,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const result = await this.productsService.delete(id);

    return {
      message: 'Product has been deleted',
      product: result,
    };
  }
}
