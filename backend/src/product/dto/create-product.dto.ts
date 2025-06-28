import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MinLength(3, { message: 'Description must be at least 3 characters long' })
  description: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a decimal number with 2 max decimal places' },
  )
  price: number;

  @IsInt({ message: 'Stock must be an integer' })
  stock: number;

  @IsOptional()
  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  imageUrl?: string;
}
