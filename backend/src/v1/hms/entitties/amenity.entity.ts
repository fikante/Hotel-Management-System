
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn()
  amenityId: number;

  @Column()
  amenityName: string;
}