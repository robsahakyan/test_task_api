import { Controller, Get } from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from '../common/modules/category/category.dto';

@Controller('/categories')
@ApiTags('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("")
  async getCategories(): Promise<CategoryDto[]> {
    return this.categoryService.getCategories();
  }


}