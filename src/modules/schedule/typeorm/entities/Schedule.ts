import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Equipment from '../../../equipment/typeorm/entities/Equipment';

@Entity('schedules')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  equipment_id: string;

  @Column()
  action: string;

  @OneToOne(() => Equipment)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @Column()
  date_schedule: Date;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default Schedule;
