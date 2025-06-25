import { Module } from '@nestjs/common';
import { ProductController } from 'src/product/controller';
import { ProductService } from 'src/product/service';
import { ProductRepository } from './repository/product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
