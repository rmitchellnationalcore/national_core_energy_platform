import { Module } from '@nestjs/common';
import * as Redis from 'redis';

import { REDIS } from './redis.constants';

const url = process.env.REDIS_URL || 'redis://localhost:6379';

@Module({
    providers: [
        {
          provide: REDIS,
          useFactory: async () => {
            const client = Redis.createClient({
              url: url, 
              legacyMode: false 
            })
            await client.connect()
            return client
          },
        },
      ],
      exports: [REDIS],
})
export class RedisModule {}

