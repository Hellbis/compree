import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { AuthGuard, RequestUser } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Req() req: RequestUser, @Body() orderData: CreateOrderDTO) {
    const userId = req.user.sub;
    const newOrder = await this.ordersService.create(userId, orderData);
    return newOrder;
  }

  @Patch(':id')
  update(
    @Param('id') orderId: string,
    @Body() orderUpdateData: UpdateOrderDto,
    @Req() req: RequestUser,
  ) {
    const userId = req.user.sub;
    return this.ordersService.update(orderId, orderUpdateData, userId);
  }

  @Get()
  async getUserOders(@Req() req: RequestUser) {
    const userId = req.user.sub;
    const orders = await this.ordersService.findUserOrders(userId);

    return orders;
  }
}
