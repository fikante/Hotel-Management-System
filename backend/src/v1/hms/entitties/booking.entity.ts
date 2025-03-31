import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotel } from './hotel.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guestName: string;

  @Column()
  roomNum: string;

  @Column()
  bookingType: string;

  @Column()
  roomType: string;

  @Column({ type: 'timestamp' })
  checkIn: Date;

  @Column({ type: 'timestamp' })
  checkOut: Date;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Hotel, hotel => hotel.bookings)
  hotel: Hotel;
}