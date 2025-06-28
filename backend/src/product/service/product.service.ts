import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductRepository } from 'src/product/repository';
import { ProductServiceInterface } from 'src/product/service';
import {
  CreateProductDto,
  UpdateProductDto,
  UpdateProductStockDto,
} from 'src/product/dto';

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAllProducts();
  }

  async getProductById(id: Product['id']): Promise<Product | null> {
    return await this.productRepository.getProductById(id);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.createProduct(createProductDto);
  }

  async updateProductStockByProductId(
    id: Product['id'],
    updateProductStockDto: UpdateProductStockDto,
  ): Promise<Product | null> {
    return await this.productRepository.updateProductStockByProductId(
      id,
      updateProductStockDto,
    );
  }

  async updateProductById(
    id: Product['id'],
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    return await this.productRepository.updateProductById(id, updateProductDto);
  }
}
