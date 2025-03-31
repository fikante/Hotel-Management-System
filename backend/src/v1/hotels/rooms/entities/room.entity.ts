import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Hotel } from '../../entities/hotel.entity';
@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  roomId: string;

  @Column()
  bed: number;

  @Column()
  size: number; // meter square

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  occupancy: number;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerDay: number;

  @Column()
  status: string;

  @Column()
  image: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;
}
