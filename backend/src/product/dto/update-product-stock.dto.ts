import { PickType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductStockDto extends PickType(CreateProductDto, [
  'stock',
]) {}
