import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
// import { CronjobCoordinatorService } from 'src/cronjob-coordinator/cronjob-coordinator.service';
import { CronjobRedisCoordinatorService } from 'src/cronjobs/cronjob-redis-coordinator/cronjob-redis-coordinator.service';

@Injectable()
export class CronjobsService {
  constructor(
    // private readonly cronjobCoordinatorService: CronjobCoordinatorService,
    private readonly cronjobRedisCoordinatorService: CronjobRedisCoordinatorService,
  ) {}
  private readonly logger = new Logger(CronjobsService.name);

  // @Cron('*/5 * * * * *')
  // async syncJobOne() {
  //   const isAllow = await this.cronjobCoordinatorService.allowRun(
  //     'syncJobOne',
  //     new Date(),
  //   );
  //   if (isAllow) this.logger.log(`syncJobOne: ${new Date()}`);
  // }

  @Cron('*/5 * * * * *')
  async syncJobTwo() {
    const time: Date = new Date();
    const isAllow = await this.cronjobRedisCoordinatorService.allowRun(
      'syncJobTwo',
      time,
    );
    if (isAllow) this.logger.log(`syncJobTwo: ${time}`);
  }
}
