import { Module } from '@nestjs/common';
// import { CronjobCoordinatorModule } from 'src/cronjob-coordinator/cronjob-coordinator.module';
import { CronjobRedisCoordinatorModule } from 'src/cronjobs/cronjob-redis-coordinator/cronjob-redis-coordinator.module';
import { CronjobsService } from './cronjobs.service';

@Module({
  imports: [CronjobRedisCoordinatorModule],
  providers: [CronjobsService],
})
export class CronjobsModule {}
