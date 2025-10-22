import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CartService } from './Cart.service';

@Controller('carrito')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //ver carrito
  @Get(':userId')
getCartByParam(@Param('userId') userId: string) {
  return this.cartService.getCart(userId);
}

  //agregar producto
  @Post("/post") addToCart( @Body('userId') userId: string, @Body('productId') productId: string, @Body('cantidad') cantidad: number,) {
    return this.cartService.addToCart(userId, productId, cantidad);
  }

  //actualizar cantidad
  @Put(':itemId') updateItemQuantity( @Param('itemId') itemId: string, @Body('userId') userId: string, @Body('cantidad') cantidad: number,) {
    return this.cartService.updateItemQuantity(userId, itemId, cantidad);
  }

  //eliminar producto
  @Delete(':itemId')removeItem( @Param('itemId') itemId: string, @Body('userId') userId: string,) {
    return this.cartService.removeItem(userId, itemId);
  }
  @Delete('clear/:userId')
  async clearCart(@Param('userId') userId: string) {
    return await this.cartService.clearCart(userId);
  }
}

