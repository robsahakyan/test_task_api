import { Repository } from 'typeorm';
import { CustomRepository } from '../../../db/typeorm-ex.decorator';
import { ProductCategoriesEntity } from '../entities/product-categories.entity';

@CustomRepository(ProductCategoriesEntity)
export class ProductCategoriesRepository extends Repository<ProductCategoriesEntity> {
  async findById(id: string): Promise<ProductCategoriesEntity | null> {
    return this.findOne({ where: { id } });
  }
}
