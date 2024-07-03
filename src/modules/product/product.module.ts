import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmExModule } from '../../db/typeorm-ex.module';
import { ProductRepository } from './repositories/product.repository';
import { ProductCategoriesRepository } from './repositories/product-categories.repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ProductRepository, ProductCategoriesRepository]),
    forwardRef(() => CategoryModule),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
