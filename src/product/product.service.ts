// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(
    storeId: string,
    categorySlug: string,
    data: Omit<Prisma.ProductCreateInput, 'Store' | 'Category'>,
  ) {
    return this.prisma.product.create({
      data: {
        ...data,
        Store: { connect: { id: storeId } },
        Category: { connect: { slug: categorySlug } },
      },
    });
  }

  async getProductsByStore(storeId: string) {
    return this.prisma.product.findMany({
      where: { storeId },
      include: {
        Category: true, // include the category relation
      },
    })
  }

  async getAllProducts() {
    return this.prisma.product.findMany({
      include: {
        Category: true,
      },
    })
  }
}
