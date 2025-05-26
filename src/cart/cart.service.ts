import { Injectable } from '@nestjs/common';
import { table } from 'node:console';
import { PrismaService } from "prisma/prisma.service";
@Injectable()
export class CartService {
    constructor(private prisma:PrismaService){}
    async addToCart(userId: string, productId: string) {
        const userCart = await this.prisma.cart.upsert({
          where: { userId },
          create: { userId },
          update: {},
          include: { items: true }
        });
      
        const existingItem = userCart.items.find(item => item.productId === productId);
      
        if (existingItem) {
          // increment quantity
          return this.prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: { increment: 1 } }
          });
        }
      
        return this.prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productId,
            quantity: 1
          }
        });
      }

      async getUserCart(userId:string){
        return this.prisma.cart.findMany({
            where: {userId},
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })
      }
    
      async getCartItemsCount(userId:string):Promise<number>{
        const cart = await this.prisma.cart.findUnique({
            where: {userId},
            include: {
                items:true
            }
        })

        return cart?.items.length || 0;

      }

      async getCartItems(userId:string){
        const cart = await this.prisma.cart.findUnique({
          where: {userId},
          include:{
            items: {
              include: {
                product:true
              }
            }
          }
        })
        
        // return cart?.items.map(item => item.product)

        const formattedItems = cart?.items.map(item => ({
          ...item.product,
          price: Number(item.product.price)
        }))
        
        return formattedItems || []
      }

      async removeFromCart(userId: string, productId: string) {
        const cart = await this.prisma.cart.findUnique({
          where: { userId: userId },
          select: { id: true }
        });
      
        if (!cart) {
           return {
            message: "Cart not found for the User"
           }
        }
      
        const item = await this.prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId: productId
          }
        });
      
        if (!item) {
          return (
            {
           message: "Item not found in user's cart"
          });
        }
      
        await this.prisma.cartItem.delete({
          where: { id: item.id }
        });
      
        return { message: "Item removed successfully" };
      }
}
