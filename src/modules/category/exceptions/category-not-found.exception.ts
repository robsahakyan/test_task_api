import { NotFoundException } from '@nestjs/common';
import { MessageTypeEnum, messages } from '../../../constants/message.enum';


export class CategoryDoesNotFound extends NotFoundException {
  constructor() {
    super(messages[MessageTypeEnum.CATEGORY_IS_NOT_FOUND], MessageTypeEnum.CATEGORY_IS_NOT_FOUND);
  }
}
