import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('permissions')
export default class Permissions {
  @PrimaryColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  label: string;
}
