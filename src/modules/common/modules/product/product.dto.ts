  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import { AbstractDto } from '../../../common/dtoes/abstract.dto';
  import { ProductEntity } from '../../../product/entities/product.entity';
  import { ProductCategoriesDto } from './product-categories.dto';

  export class ProductDto extends AbstractDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    sku: string;

    @ApiProperty()
    price: number;
    
    @ApiProperty()
    description: string;

    @ApiPropertyOptional()
    productCategory: ProductCategoriesDto;

    constructor(product: ProductEntity) {
      super(product);
      
      this.sku = product.sku;
      this.title = product.title;
      this.description = product.description;
      this.productCategory = product.productCategory.toDto();
    }
  }
