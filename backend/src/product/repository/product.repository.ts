import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/service/database.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly database: DatabaseService) {}

  async getAllProducts() {
    return await this.database.product.findMany();
  }
}
