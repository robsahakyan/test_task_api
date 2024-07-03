import { compare, hashSync } from 'bcryptjs';
import { isArray } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
export class UtilsProvider {
  /**
   * convert entity to dto class instance
   * @param {{new(entity: E, options: any): T}} model
   * @param {E[] | E} entity
   * @param options
   * @returns {T[] | T}
   */
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E,
    options?: Record<string, any>,
  ): T;

  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E[],
    options?: Record<string, any>,
  ): T[];

  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E | E[],
    options?: Record<string, any>,
  ): T | T[] {
    if (Array.isArray(entity)) {
      return entity.map((u) => new model(u, options));
    }

    return new model(entity, options);
  }

  static getFileName(text: string) {
    const regexFileName = /([\s\w().:\\\-])+(.png|.jpeg|.jpg)$/; // add extensions for photo
    const fileName = text.match(regexFileName);

    return fileName[0];
  }

  static generateHash(password: string): string {
    return hashSync(password, 10);
  }

  static isProduction(): boolean {
    return process.env.NODE_ENV === "production" ? true : false
  }

  static validateHash(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) {
      return Promise.resolve(false);
    }

    return compare(password, hash);
  }

  static isUUID(value: string | string[]): boolean {
    const uuidPattern = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (!uuidPattern.test(item)) {
          return false;
        }
      }

      return true;
    }

    return uuidPattern.test(value);
  }
  
  static getIds(value) {
    let ids: string[] | undefined;

    if (value?.length) {
      ids = [];

      if (isArray(value)) {
        ids.push(...(value as string[]));
      } else {
        ids.push(...(JSON.parse(value as string)[0] as string[]));
      }
    }

    return ids;
  }

  static stringToArrayParser({ value }) {
    if (Array.isArray(value)) {
        return value;
    } else if (typeof value === 'string') {
        return [value];
    } else {
        throw new BadRequestException('Invalid data type');
    }
  }
  
}
