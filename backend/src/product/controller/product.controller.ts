import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProductService } from 'src/product/service';
import { ParamIDDto } from 'src/@shared/dto';
import {
  CreateProductDto,
  UpdateProductDto,
  UpdateProductStockDto,
} from 'src/product/dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async products() {
    return await this.productService.getAllProducts();
  }

  @Get()
  async procuctById(@Param() { id }: ParamIDDto) {
    return await this.productService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() creadeProductDto: CreateProductDto) {
    return await this.productService.createProduct(creadeProductDto);
  }

  @Patch(':id/stock')
  async updateProductStockByProductId(
    @Param() { id }: ParamIDDto,
    @Body() updateProductStockDto: UpdateProductStockDto,
  ) {
    return await this.productService.updateProductStockByProductId(
      id,
      updateProductStockDto,
    );
  }

  @Put(':id')
  async updateProductById(
    @Param() { id }: ParamIDDto,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateProductById(id, updateProductDto);
  }
}
