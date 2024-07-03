import { Repository } from 'typeorm';

import { CustomRepository } from '../../db/typeorm-ex.decorator';
import { CategoryEntity } from './category.entity';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  async findById(id: string): Promise<CategoryEntity | null> {
    return this.findOne({ where: { id } }).catch(() => {throw new NotFoundException("Category is not found")});
  }

  async getAll(): Promise<CategoryEntity[] | null> {
    return this.createQueryBuilder('category').getMany();
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    return this.createQueryBuilder('category')
      .where('category.name = :name', { name })
      .getOne()
  }

  async deleteAll() {
    return this.createQueryBuilder('product')
      .delete()
      .execute()
  }
}
