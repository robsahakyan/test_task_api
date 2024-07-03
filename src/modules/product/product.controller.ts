import { Controller, Get, Delete, Query, Post, Body, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { PageDto } from '../common/dtoes/page.dto';
import { ProductDto } from '../common/modules/product/product.dto';
import { UpdateProductDto } from './dtoes/update-product.dto';
import { CreateNewProductDto } from './dtoes/create-new-product.dto';
import { UUIDParam } from '../../decorators/http.decorator';
import { PageOptionsDto } from '../common/dtoes/page-options.dto';

@Controller('/products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  async createProduct(
    @Body() createNewProductDto: CreateNewProductDto
  ) {
    return this.productService.createNewProduct(createNewProductDto)
  }
  
  @Get('')
  async getProducts(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProductDto>> {
    return this.productService.getProducts(pageOptionsDto)
  }

  @Get(':id')
  async getSingleProduct(
    @UUIDParam('id') id: string,
  ): Promise<ProductDto> {
    return this.productService.getSingleProductById(id);
  }

  @Put(':id')
  async updateProduct(
    @UUIDParam('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.updateProductById(id, updateProductDto)
  }
  
  @Delete(':id')
  async deleteProduct(
    @UUIDParam('id') id: string
  ): Promise<void> {
    return this.productService.deleteProductById(id)
  }

  // @Delete()
  // async deleteProducts(): Promise<void> {
  //   return this.productService.deleteProducts()
  // }

}