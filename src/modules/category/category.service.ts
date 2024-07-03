import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository } from './category.repository';
import { Transactional } from 'typeorm-transactional';
import { CategoryDto } from '../common/modules/category/category.dto';
import { categoryList } from "../../constants/category-list";
import { CategoryEntity } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(
    public readonly categoryRepository: CategoryRepository,
  ) {}

  async getCategories(): Promise<CategoryDto[]> {
    return this.categoryRepository.getAll();
  }

  async getCategoryById(id: string) {
    const categoryEntity = await this.categoryRepository.findById(id);

    if (!categoryEntity) {
      throw new NotFoundException();
    }
    return categoryEntity;
  }

  @Transactional()
  async seed() {
    const categoriesList = await this.categoryRepository.getAll();
    
    if (categoriesList && categoriesList.length) {
      console.log("There are already some categories. so we don't need to sync again");
      return;
    }
    const categoryEntitiesList: CategoryEntity[] = [];
    for (const category of categoryList) {
      categoryEntitiesList.push(this.categoryRepository.create({ title: category.title, description: category.description }));
    }
    await this.categoryRepository.save(categoryEntitiesList);
    console.log('Categories successfully synced to db')
    return this.getCategories();
  }

  async deleteCategories() {
    await this.categoryRepository.deleteAll()

  }
}