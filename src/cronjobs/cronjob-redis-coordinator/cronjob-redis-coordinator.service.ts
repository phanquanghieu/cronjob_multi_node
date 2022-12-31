import { createClient, RedisClientType } from 'redis';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class CronjobRedisCoordinatorService {
  private redis: RedisClientType;
  constructor() {
    this.redis = createClient();
    console.log('redis')
    this.redis.on('error', (err) => console.log('Redis Client Error', err));
    this.redis.connect().then((...arg) => console.log('Redis connect: ', arg));
  }
  async allowRun(name: string, time: Date): Promise<boolean> {
    const key = name + dayjs(time).format('YYYY-MM-DD_HH-mm-ss');
    const result = await this.redis.set(key, 'ok', { EX: 10, NX: true });
    console.log(result);
    return Boolean(result);
  }
}
