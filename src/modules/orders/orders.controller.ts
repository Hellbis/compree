import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Query('userId') userId: string,
    @Body() orderData: CreateOrderDTO,
  ) {
    const pedidoCriado = await this.ordersService.create(userId, orderData);
    return pedidoCriado;
  }

  @Patch(':id')
  update(
    @Param('id') orderId: string,
    @Body() orderUpdateData: UpdateOrderDto,
  ) {
    return this.ordersService.update(orderId, orderUpdateData);
  }

  @Get()
  async obtemPedidosDeUsuario(@Query('userId') userId: string) {
    const pedidos = await this.ordersService.findUserOrders(userId);

    return pedidos;
  }
}
