import { BadRequestException } from '@nestjs/common';

export class ProductAlreadyExistsException extends BadRequestException {
  constructor() {
    super('Product already exists');
  }
}
