import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dtoes/abstract.dto';
import { CategoryEntity } from '../../../category/category.entity';

export class CategoryDto extends AbstractDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;


  constructor(category: CategoryEntity) {
    super(category);

    this.title = category.title;
    this.description = category.description;
 
  }
}
