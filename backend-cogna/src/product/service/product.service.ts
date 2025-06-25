import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/product/repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts() {
    return await this.productRepository.getAllProducts();
  }
}
