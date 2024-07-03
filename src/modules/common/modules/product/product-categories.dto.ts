import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../dtoes/abstract.dto';
import { ProductCategoriesEntity } from '../../../product/entities/product-categories.entity';
import { CategoryDto } from '../category/category.dto';

export class ProductCategoriesDto extends AbstractDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  categoryId: string;

  @ApiPropertyOptional()
  category: CategoryDto;

  constructor(productCategories: ProductCategoriesEntity) {
    super(productCategories);
    
    this.productId = productCategories.productId;
    this.categoryId = productCategories.categoryId;
    this.category = productCategories.category;
  }
}