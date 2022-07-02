import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Permissions from '../../../permissions/typeorm/entities/permission';

@Entity('roles')
export default class Role {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  label: string;
  @ManyToMany(() => Permissions)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permissions[];
}
