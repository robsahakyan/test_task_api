import { Injectable } from '@nestjs/common';
import Redis, { Cluster } from 'ioredis';
import { ApiConfigService } from './api-config.service';

@Injectable()
export class RedisService {
  private readonly redis: Cluster | Redis;

  constructor(private readonly configService: ApiConfigService) {
  }

  async set(key: string, value: string, expiry?: number): Promise<'OK' | null> {
    return expiry
      ? this.redis.set(key, value, 'EX', expiry)
      : this.redis.set(key, value);
  }

  async get(key: string): Promise<string> {
    return this.get(key);
  }

  async delete(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async isCached(key: string, value: string): Promise<boolean> {
    return (await this.redis.get(key)) === value;
  }
}
