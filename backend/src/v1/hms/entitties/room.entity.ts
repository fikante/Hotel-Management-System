// src/entities/room.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Hotel } from './hotel.entity';
import { Amenity } from './amenity.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roomNumber: string;

  @Column()
  type: string;

  @Column('float')
  price: number;

  @Column()
  occupancy: number;

  @Column()
  bed: number;

  @Column()
  image: string;

  @Column({ name: 'image_public_id' })
  imagePublicId: string;

  @Column()
  description: string;

  @Column()
  size: number;

  @Column({ default: 'available' })
  status: string;

  @ManyToOne(() => Hotel, hotel => hotel.rooms)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @ManyToMany(() => Amenity)
  @JoinTable()
  amenities: Amenity[];
}