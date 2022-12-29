import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronjobCoordinatorService } from 'src/cronjob-coordinator/cronjob-coordinator.service';

@Injectable()
export class CronjobsService {
  constructor(
    private readonly cronjobCoordinatorService: CronjobCoordinatorService,
  ) {}
  private readonly logger = new Logger(CronjobsService.name);
  
  @Cron('*/5 * * * * *')
  async syncOneJob() {
    const isAllow = await this.cronjobCoordinatorService.allowRun(
      'syncOneJob',
      new Date(),
    );
    if (isAllow) this.logger.log(`syncOneJob: ${new Date()}`);
  }
}
