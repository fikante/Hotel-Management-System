import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Guest_Auth {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  // Relate this entity with the main Guest entity with this commented code

  // @OneToOne(() => Guest)
  // guest_id: id;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
