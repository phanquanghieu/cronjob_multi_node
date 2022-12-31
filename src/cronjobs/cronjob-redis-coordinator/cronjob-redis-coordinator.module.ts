import { Module } from '@nestjs/common';
import { CronjobRedisCoordinatorService } from './cronjob-redis-coordinator.service';

@Module({
  providers: [CronjobRedisCoordinatorService],
  exports: [CronjobRedisCoordinatorService],
})
export class CronjobRedisCoordinatorModule {}
