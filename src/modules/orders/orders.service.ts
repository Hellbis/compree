/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { OrderStatus } from './enum/order-status.enum';
import { CreateOrderDTO, OrderItemDTO } from './dtos/create-order.dto';
import { OrderItemEntity } from './order-item.entity';
import { ProductEntity } from '../products/product.entity';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  private async findUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (user === null) throw new NotFoundException('User not found');

    return user;
  }

  private orderValidator(
    orderItem: OrderItemDTO,
    relatedProduct?: ProductEntity,
  ) {
    if (relatedProduct === undefined)
      throw new NotFoundException(`Product ${orderItem.productId} not found`);

    if (orderItem.amount > relatedProduct.availableQuantity)
      throw new BadRequestException(
        `The requested quantity ${orderItem.amount} is greater than the available quantity ${relatedProduct.availableQuantity}`,
      );
  }

  async create(userId: string, orderData: CreateOrderDTO) {
    const user = await this.findUser(userId);

    const productsIds = orderData.orderItems.map(
      (orderItem) => orderItem.productId,
    );

    const relatedProducts = await this.productsRepository.findBy({
      id: In(productsIds),
    });
    const orderEntity = new OrderEntity();

    orderEntity.status = OrderStatus.IN_PROCESSING;
    orderEntity.user = user;

    const orderItemsEntities = orderData.orderItems.map((orderItem) => {
      const orderItemEntity = new OrderItemEntity();
      const relatedProduct = relatedProducts.find(
        (produto) => produto.id === orderItem.productId,
      );

      this.orderValidator(orderItem, relatedProduct);

      orderItemEntity.product = relatedProduct!;
      orderItemEntity.salePrice = relatedProduct!.price;
      orderItemEntity.amount = orderItem.amount;
      orderItemEntity.product.availableQuantity -= orderItem.amount;
      return orderItemEntity;
    });

    const totalPrice = orderItemsEntities.reduce((total, item) => {
      return total + item.salePrice * item.amount;
    }, 0);

    orderEntity.orderItems = orderItemsEntities;
    orderEntity.totalPrice = totalPrice;

    const pedidoCriado = await this.ordersRepository.save(orderEntity);
    return pedidoCriado;
  }

  async update(id: string, dto: UpdateOrderDto, userId: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (order === null) throw new NotFoundException('Order not found');

    if (order.user.id !== userId) {
      throw new ForbiddenException('Not permission for this action');
    }

    Object.assign(order, dto);

    return this.ordersRepository.save(order);
  }

  async findUserOrders(userId: string) {
    await this.findUser(userId);

    return this.ordersRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });
  }
}
