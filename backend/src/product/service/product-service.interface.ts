import { Product } from '@prisma/client';
import {
  CreateProductDto,
  UpdateProductDto,
  UpdateProductStockDto,
} from 'src/product/dto';

export interface ProductServiceInterface {
  /**
   * Fetches all products from the service.
   * @returns A promise that resolves to an array of Product objects.
   */
  getAllProducts(): Promise<Product[]>;

  /**
   * Fetches a product by its ID from the service.
   * @param id - The ID of the product to fetch.
   * @returns A promise that resolves to a Product object or null if not found.
   */
  getProductById(id: Product['id']): Promise<Product | null>;

  /**
   * Creates a new product in the service.
   * @param createProductDto - The data transfer object containing product details.
   * @returns A promise that resolves to the created Product object.
   */
  createProduct(createProductDto: CreateProductDto): Promise<Product>;

  /**
   * Updates the stock of a product by its ID.
   * @param id - The ID of the product whose stock is to be updated.
   * @param quantity - The new stock quantity for the product.
   * @returns A promise that resolves to the updated Product object or null if not found.
   */
  updateProductStockByProductId(
    id: Product['id'],
    updateProductStockDto: UpdateProductStockDto,
  ): Promise<Product | null>;

  /**
   * Updates a product by its ID.
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data transfer object containing updated product details.
   * @returns A promise that resolves to the updated Product object or null if not found.
   */
  updateProductById(
    id: Product['id'],
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null>;
}
