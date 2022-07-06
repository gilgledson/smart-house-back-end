import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../../users/typeorm/entities/User';

@Entity('equipments')
class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  address: string;

  @Column()
  latitude: string;
  @Column()
  region: string;

  @Column()
  longitude: string;

  @Column()
  user_id: string;

  @Column({ type: 'bool', width: 1 })
  power: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default Equipment;
