import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronjobCoordinator } from './cronjob-coordinator.entity';
import { CronjobCoordinatorService } from './cronjob-coordinator.service';

@Module({
  imports: [TypeOrmModule.forFeature([CronjobCoordinator])],
  providers: [CronjobCoordinatorService],
  exports: [CronjobCoordinatorService]
})
export class CronjobCoordinatorModule {}
