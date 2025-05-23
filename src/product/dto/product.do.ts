// src/product/dto/create-product.dto.ts
export class CreateProductDto {
    name: string;
    slug: string;
    description?: string;
    price: number;
    images: string[]; // assuming images is a string array
    categorySlug: string;
  }
  