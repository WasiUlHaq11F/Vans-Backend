// src/product/product.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.do';
import { Prisma } from '@prisma/client';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('stores/:storeId/products')
  async create(
    @Param('storeId') storeId: string,
    @Body() body: CreateProductDto,
  ) {
    const { categorySlug, ...productData } = body;

    return this.productService.createProduct(storeId, categorySlug, {
      ...productData,
      price: new Prisma.Decimal(productData.price), 
    });
  }

  @Get('stores/:storeId/products')
  async findAllByStore(@Param('storeId') storeId: string) {
    return this.productService.getProductsByStore(storeId);
  }

  @Get('products/all')
  async findAll() {
    return this.productService.getAllProducts();
  }

  @Delete('products/:productId')
  async deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }

  @Patch('products/:productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() data: Partial<Prisma.ProductUpdateInput>,
  ) {
    return this.productService.updateProduct(productId, data);
  }
}
