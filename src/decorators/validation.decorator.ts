import { applyDecorators, UnprocessableEntityException } from '@nestjs/common';
import { ValidateIf } from 'class-validator';

export class UnprocessableRangeException extends UnprocessableEntityException {
  constructor(fromKey: string, toKey: string) {
    super(`${fromKey} must be less then ${toKey}`, 'unprocessable_range');
  }
}

export function ValidateFromToRange(
  fromKey: string,
  toKey: string,
): PropertyDecorator {
  return applyDecorators(
    ValidateIf((obj) => {
      if (obj && obj[fromKey] > obj[toKey]) {
        throw new UnprocessableRangeException(fromKey, toKey);
      }

      return true;
    }),
  );
}

export function ValidateFromToRangeOptional(
  fromKey: string,
  toKey: string,
): PropertyDecorator {
  return applyDecorators(
    ValidateIf((obj) => {
      if (obj && obj[fromKey] && obj[toKey] && obj[fromKey] > obj[toKey]) {
        throw new UnprocessableRangeException(fromKey, toKey);
      }

      return true;
    }),
  );
}
