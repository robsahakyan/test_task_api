import { Column, Entity, Index, OneToOne } from "typeorm";
import { AbstractEntity } from "../../common/entities/abstract.entity";
import { ProductDto } from "../../common/modules/product/product.dto";
import { ProductCategoriesEntity } from "./product-categories.entity";

@Entity({ name: "products"})
export class ProductEntity extends AbstractEntity<ProductDto> {
    @Column()
    title: string;

    @Column({ length: 8 })
    @Index({ unique: true})
    sku: string;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    price: number;
    
    @Column()
    description: string;

    @OneToOne(() => ProductCategoriesEntity,
    (productCategories) => productCategories.product 
    )
    productCategory: ProductCategoriesEntity;

    dtoClass = ProductDto;
}