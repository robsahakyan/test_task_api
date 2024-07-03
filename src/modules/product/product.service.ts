import { UpdateProductDto } from './dtoes/update-product.dto';
import { CreateNewProductDto } from './dtoes/create-new-product.dto';
import { ProductDto } from '../common/modules/product/product.dto';
import { ProductRepository } from './repositories/product.repository';
import { ProductCategoriesRepository } from './repositories/product-categories.repository';
import {  Injectable, NotFoundException } from "@nestjs/common";
import { CategoryService } from '../category/category.service';
import { Transactional } from 'typeorm-transactional';
import { ProductAlreadyExistsException } from './exceptions/product-already-exists.exception';
import { PageOptionsDto } from '../common/dtoes/page-options.dto';
import { PageDto } from '../common/dtoes/page.dto';

@Injectable()
export class ProductService {
  constructor(
    public readonly productRepository: ProductRepository,
    public readonly categoryService: CategoryService,
    public readonly productCategoriesRepository: ProductCategoriesRepository
  ) {}

  @Transactional()
   async createNewProduct(data: CreateNewProductDto) {
    const productWithExistingItem = await this.productRepository.getProductBySku(data.sku);

    if (productWithExistingItem) {
      throw new ProductAlreadyExistsException()
    }

    const entity = await this.productRepository.save(this.productRepository.create({
      title: data.title,
      sku: data.sku,
      price: data.price,
      description: data.description
    }));

    const categoryFromDB = await this.categoryService.getCategoryById(data.categoryId);

    if (data.categoryId) {
      entity.productCategory = await this.productCategoriesRepository.save(this.productCategoriesRepository.create({
        productId: entity.id,
        product: entity,
        categoryId: data.categoryId,
        category: categoryFromDB
      }).toDto());
    }

    return entity;
   }

   @Transactional()
   async getProducts(pageOptionsDto: PageOptionsDto): Promise<PageDto<ProductDto>> {
    let productEntitiesQuery = await this.productRepository.getAll();

    
    const [productEntities, pageMetaDto] = await productEntitiesQuery.paginate(
      pageOptionsDto
    );

    return productEntities.toPageDto(pageMetaDto);
   }


   @Transactional()
   async updateProductById(id: string,  updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException("Product is not found");
    }

    return (await this.productRepository.findById(id)).toDto()
   }


   async getSingleProductById(id: string): Promise<ProductDto> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new NotFoundException("Product is not found");
    }

    return product.toDto();
   }

  @Transactional() 
  async deleteProductById(id: string):Promise<void> {
    await this.getSingleProductById(id)
    await this.productRepository.delete(id)
  }
}
