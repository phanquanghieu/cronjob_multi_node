import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CronjobCoordinator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'timestamp', nullable: true })
  time: Date;

  @Column({ type: 'int' })
  process: number;

  @CreateDateColumn()
  created_at
}
