import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { CronjobsModule } from './cronjobs/cronjobs.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3307,
    //   username: 'root',
    //   password: 'pass',
    //   database: 'cronjob',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   logging: true,
    // }),
    ScheduleModule.forRoot(),
    CronjobsModule,
  ],
})
export class AppModule {}
