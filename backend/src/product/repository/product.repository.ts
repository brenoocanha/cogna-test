import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly database: DatabaseService) {}

  async getAllProducts() {
    return await this.database.
  }
}
