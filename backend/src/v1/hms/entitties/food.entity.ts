import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotel } from './hotel.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column()
  description: string;

  @Column()
  categories: string;

  @Column({ nullable: true })
  timeToMake: number;

  @ManyToOne(() => Hotel, hotel => hotel.foods)
  hotel: Hotel;
}