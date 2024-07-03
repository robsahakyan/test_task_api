import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { CategoryEntity } from '../../category/category.entity';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { ProductEntity } from './product.entity';
import { ProductCategoriesDto } from '../../../modules/common/modules/product/product-categories.dto';

@Entity({ name: 'product_categories' })
export class ProductCategoriesEntity extends AbstractEntity<ProductCategoriesDto> {
  @Column()
  productId: string;

  @Column()
  categoryId: string;

  @OneToOne(
    () => ProductEntity,
    (productEntity) => productEntity.productCategory,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'product_id' })
  product?: ProductEntity;

  @ManyToOne(
    () => CategoryEntity,
    (categoryEntity) => categoryEntity.productCategories,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'category_id' })
  category?: CategoryEntity;

  dtoClass = ProductCategoriesDto;
}
