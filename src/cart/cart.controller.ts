import { Controller,Body,Post, UseGuards, Param,Req, Get, Delete} from "@nestjs/common";
import { CartService } from "./cart.service";

@Controller('cart')
export class CartController {
    constructor(private cartService:CartService){}

    @Post(':id')
    async addToCart(@Param('id') id: string, @Body('userId') userId:string, @Req() req) {
      return this.cartService.addToCart(userId, id);
    }

    @Get()
    async getCart(@Req() @Body('userId') userId:string, req){
      return this.cartService.getUserCart(userId);
    }

    @Get('count/:userId')
    async getCartItemsCount(@Param('userId') userId: string){
      return this.cartService.getCartItemsCount(userId);
    }

    @Get('items/:userId')
    async getCartItems(@Param('userId') userId:string){
      return this.cartService.getCartItems(userId);
    }

    @Delete('items/:id')
    async removeFromCart(@Param('productId') productId:string, @Body() body:{userId:string}){
      return this.cartService.removeFromCart(body.userId, productId);
    }
    

    
}