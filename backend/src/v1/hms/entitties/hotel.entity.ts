import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';
import { Food } from './food.entity';
import { Room } from './room.entity';


@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Booking, booking => booking.hotel)
  bookings: Booking[];

  @OneToMany(() => Room, room => room.hotel)
  rooms: Room[];

  @OneToMany(() => Food, food => food.hotel)
  foods: Food[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}