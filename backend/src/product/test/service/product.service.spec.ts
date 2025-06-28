import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from 'src/product/service/product.service';
import { ProductRepository } from 'src/product/repository/product.repository';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import {
  CreateProductDto,
  UpdateProductDto,
  UpdateProductStockDto,
} from 'src/product/dto';

const mockProductRepository = {
  getAllProducts: jest.fn(),
  getProductById: jest.fn(),
  createProduct: jest.fn(),
  updateProductById: jest.fn(),
  updateProductStockByProductId: jest.fn(),
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const mockProducts: Product[] = [];
      mockProductRepository.getAllProducts.mockResolvedValue(mockProducts);
      const result = await service.getAllProducts();
      expect(result).toEqual(mockProducts);
      expect(mockProductRepository.getAllProducts).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductById', () => {
    it('should return a product when a valid ID is provided', async () => {
      const productId = 'valid-id';
      const mockProduct: Product = {
        id: productId,
        name: 'Product',
        description: null,
        price: new Decimal(10),
        stock: 100,
        imageUrl: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      mockProductRepository.getProductById.mockResolvedValue(mockProduct);
      const result = await service.getProductById(productId);
      expect(result).toEqual(mockProduct);
      expect(mockProductRepository.getProductById).toHaveBeenCalledWith(
        productId,
      );
    });

    it('should return null when an invalid ID is provided', async () => {
      const invalidId = 'invalid-id';
      mockProductRepository.getProductById.mockResolvedValue(null);
      const result = await service.getProductById(invalidId);
      expect(result).toBeNull();
      expect(mockProductRepository.getProductById).toHaveBeenCalledWith(
        invalidId,
      );
    });
  });

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const createDto: CreateProductDto = {
        name: 'New Product',
        price: 10,
        stock: 100,
        description: 'desc',
        imageUrl: 'url',
      };
      const expectedProduct: Product = {
        id: 'new-id',
        name: createDto.name,
        description: createDto.description,
        price: new Decimal(createDto.price),
        stock: createDto.stock,
        imageUrl: createDto.imageUrl ?? null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      mockProductRepository.createProduct.mockResolvedValue(expectedProduct);
      const result = await service.createProduct(createDto);
      expect(result).toEqual(expectedProduct);
      expect(mockProductRepository.createProduct).toHaveBeenCalledWith(
        createDto,
      );
    });
  });

  describe('updateProductById', () => {
    it('should update product details and return the updated product', async () => {
      const productId = 'id-to-update';
      const updateDto: UpdateProductDto = { name: 'Updated Name' };
      const expectedProduct: Product = {
        id: productId,
        name: 'Updated Name',
        description: null,
        price: new Decimal(10),
        stock: 100,
        imageUrl: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      mockProductRepository.updateProductById.mockResolvedValue(
        expectedProduct,
      );
      const result = await service.updateProductById(productId, updateDto);
      expect(result).toEqual(expectedProduct);
      expect(mockProductRepository.updateProductById).toHaveBeenCalledWith(
        productId,
        updateDto,
      );
    });

    it('should return null if the product to update does not exist', async () => {
      const nonExistentId = 'non-existent-id';
      const updateDto: UpdateProductDto = { name: 'Updated Name' };
      mockProductRepository.updateProductById.mockResolvedValue(null);
      const result = await service.updateProductById(nonExistentId, updateDto);
      expect(result).toBeNull();
    });
  });

  describe('updateProductStockByProductId', () => {
    it('should update the product stock and return the updated product', async () => {
      const productId = 'id-to-update';
      const updateStockDto: UpdateProductStockDto = { stock: 50 };
      const expectedProduct: Product = {
        id: productId,
        name: 'Product',
        description: null,
        price: new Decimal(10),
        stock: 50,
        imageUrl: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      mockProductRepository.updateProductStockByProductId.mockResolvedValue(
        expectedProduct,
      );
      const result = await service.updateProductStockByProductId(
        productId,
        updateStockDto,
      );
      expect(result).toEqual(expectedProduct);
      expect(
        mockProductRepository.updateProductStockByProductId,
      ).toHaveBeenCalledWith(productId, updateStockDto);
    });

    it('should return null if the product to update does not exist', async () => {
      const nonExistentId = 'non-existent-id';
      const updateStockDto: UpdateProductStockDto = { stock: 50 };
      mockProductRepository.updateProductStockByProductId.mockResolvedValue(
        null,
      );
      const result = await service.updateProductStockByProductId(
        nonExistentId,
        updateStockDto,
      );
      expect(result).toBeNull();
    });
  });
});
