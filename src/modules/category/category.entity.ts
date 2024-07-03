import { CategoryDto } from "../common/modules/category/category.dto";
import { AbstractEntity } from "../common/entities/abstract.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { ProductCategoriesEntity } from "../product/entities/product-categories.entity";

@Entity({name: 'categories'})
export class CategoryEntity extends AbstractEntity<CategoryDto> {
    @Column()
    @Index({ unique: true})
    title: string;

    @Column()
    description: string;

    @OneToMany(() => ProductCategoriesEntity,
    (productCategoriesEntity) => productCategoriesEntity.category    
    )
    productCategories?: ProductCategoriesEntity[];

    dtoClass = CategoryDto
}