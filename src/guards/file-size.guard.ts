import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';

@Injectable()
export class FileSizeGuard implements CanActivate {
  constructor(private readonly maxTotalSize: number) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const files: Express.Multer.File[] = request.files;
    const totalSize = files?.reduce((acc, file) => acc + file.size, 0) || 0;

    return totalSize <= this.maxTotalSize;
  }
}
