import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CronjobCoordinator } from './cronjob-coordinator.entity';

@Injectable()
export class CronjobCoordinatorService {
  constructor(private readonly dataSource: DataSource) {}
  async allowRun(name: string, time: Date): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    console.log(new Date(), 'startTransaction');
    try {
      const check = await queryRunner.manager
        .getRepository(CronjobCoordinator)
        .createQueryBuilder('user')
        .useTransaction(true)
        .setLock('pessimistic_read')
        .where('name = :name AND time = :time', { name, time })
        .getOne();
      console.log(new Date(), 'find', check);
      if (!check) {
        const result = await queryRunner.manager
          .getRepository(CronjobCoordinator)
          .createQueryBuilder()
          .useTransaction(true)
          .setLock('pessimistic_read')
          .insert()
          .into(CronjobCoordinator)
          .values({ name, time, process: +process.env.pm_id })
          .execute();
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        // const cronjobCoordinator = new CronjobCoordinator();
        // cronjobCoordinator.name = name;
        // cronjobCoordinator.time = time;
        // cronjobCoordinator.process = +process.env.pm_id;
        // console.log(new Date(), cronjobCoordinator);
        // const result = await queryRunner.manager.save(cronjobCoordinator);
        console.log(new Date(), result);
      }
      await queryRunner.commitTransaction();
      console.log(new Date(), 'commitTransaction');
      return !check;
    } catch (error) {
      console.log(new Date(), error.name);
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
      console.log(new Date(), 'releaseTransaction');
    }
  }
}
