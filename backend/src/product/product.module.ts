import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProductController } from 'src/product/controller';
import { ProductService } from 'src/product/service';
import { ProductRepository } from './repository/product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, DatabaseService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
