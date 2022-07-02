import Menu from '../../../../auth/menus/typeorm/entities/Menu';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles_permissions')
export default class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  role_id: string;
  @Column()
  permission_id: string;
  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'permission_id', referencedColumnName: 'permission_id' })
  menu: Menu;
}
