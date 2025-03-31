import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Staff_Auth {
  @PrimaryGeneratedColumn('uuid')
  staffId: string;

  // Relate this entity with the main Staff entity with this code

  // @OneToOne(() => Staff)
  // staff_id: id;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // the value(the date the row was created) is atuomatically generated when the record is created
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
