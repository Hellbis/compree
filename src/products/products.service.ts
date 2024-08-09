import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListProductDTO } from './dtos/list-products.dto';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { CreateProductDTO } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async create(productData: CreateProductDTO) {
    const productEntity = new ProductEntity();

    productEntity.name = productData.name;
    productEntity.price = productData.price;
    productEntity.availableQuantity = productData.availableQuantity;
    productEntity.description = productData.description;
    productEntity.category = productData.category;
    productEntity.properties = productData.properties;
    productEntity.images = productData.images;

    return this.productsRepository.save(productEntity);
  }

  async findAll() {
    const products = await this.productsRepository.find({
      relations: {
        images: true,
        properties: true,
      },
    });
    const productsList = products.map(
      (product) =>
        new ListProductDTO(
          product.id,
          product.name,
          product.properties,
          product.images,
        ),
    );
    return productsList;
  }

  async update(id: string, productData: UpdateProductDTO) {
    const productEntity = await this.productsRepository.findOneBy({ id });

    if (productEntity === null)
      throw new NotFoundException('Product not found');

    Object.assign(productEntity, productData);

    return this.productsRepository.save(productEntity);
  }

  async delete(id: string) {
    await this.productsRepository.delete(id);
  }
}
