import { Repository, SelectQueryBuilder } from 'typeorm';
import { CustomRepository } from '../../../db/typeorm-ex.decorator';
import { ProductEntity } from '../entities/product.entity';

@CustomRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  async findById(id: string): Promise<ProductEntity | null> {
    return this.createQueryBuilder('product')
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.productCategory', 'productCategory')
      .leftJoinAndSelect('productCategory.category', 'category')
      .getOne()
  }
 
  async getAll() {
    return this.createQueryBuilder('product')
  }


  async getProductBySku(sku: string) {
    return this.createQueryBuilder('product')
      .where('product.sku = :sku', { sku })
      .getOne()
  }
}
