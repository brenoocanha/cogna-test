import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { DatabaseService } from 'src/database/service';
import { ProductRepositoryInterface } from 'src/product/repository';
import { CreateProductDto, UpdateProductStockDto } from 'src/product/dto';

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  constructor(private readonly database: DatabaseService) {}

  getAllProducts(): Promise<Product[]> {
    return this.database.product.findMany();
  }

  getProductById(id: Product['id']): Promise<Product | null> {
    return this.database.product.findUnique({
      where: { id },
    });
  }

  createProduct(data: CreateProductDto): Promise<Product> {
    return this.database.product.create({
      data,
    });
  }

  updateProductStockByProductId(
    id: Product['id'],
    { stock }: UpdateProductStockDto,
  ): Promise<Product | null> {
    return this.database.product.update({
      where: { id },
      data: {
        stock,
      },
    });
  }

  updateProductById(
    id: Product['id'],
    data: Partial<CreateProductDto>,
  ): Promise<Product | null> {
    return this.database.product.update({
      where: { id },
      data,
    });
  }
}
