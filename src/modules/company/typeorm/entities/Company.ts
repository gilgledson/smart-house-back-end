import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('company')
export default class Company {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  document_number: string;
  @Column()
  street: string;

  @Column('int')
  status: number;

  @Column()
  domain: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
