import { Module } from '@nestjs/common';
import { CronjobCoordinatorModule } from 'src/cronjob-coordinator/cronjob-coordinator.module';
import { CronjobsService } from './cronjobs.service';

@Module({
  imports:[CronjobCoordinatorModule],
  providers: [CronjobsService],
})
export class CronjobsModule {}
