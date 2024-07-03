import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { IAwsS3Config } from '../../modules/common/interfaces/IAwsS3Config';
import { SnakeNamingStrategy } from '../../strategies/snake-naming.strategy';

@Injectable()
export class ApiConfigService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  private getNumber(key: string): number {
    return Number(this.configService.get(key));
  }

  private getString(key: string, defaultValue?: string): string {
    return this.configService
      .get(key, defaultValue)
      .toString()
      .replace(/\\n/g, '\n');
  }

  get appConfig() {
    return {
      port: this.getNumber('PORT'),
      domain: this.getString('DOMAIN')
    };
  }



  get typeOrmConfig(): TypeOrmModuleOptions {
    const data: TypeOrmModuleOptions = {
      entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
      type: 'postgres',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      migrationsRun: true,
      namingStrategy: new SnakeNamingStrategy(),
    };

    return data;
  }

  get redisConfig() {
    return {
      host: this.getString('REDIS_HOST'),
      port: this.getNumber('REDIS_PORT'),
    };
  }


}
