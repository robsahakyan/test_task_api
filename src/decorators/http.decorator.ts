import type { PipeTransform, Type } from '@nestjs/common';
import {
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';


export function UUIDParam(
  property: string,
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
  return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes);
}
