import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../../db/typeorm-ex.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';


@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CategoryRepository]),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
