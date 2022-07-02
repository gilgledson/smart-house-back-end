import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Permissions from '../../../permissions/typeorm/entities/permission';

@Entity('menus')
export default class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  url: string;
  @Column()
  icon: string;
  @Column()
  permission_id: string;
  @OneToOne(() => Permissions)
  @JoinColumn({ name: 'permission_id' })
  permission: Permissions;
}
