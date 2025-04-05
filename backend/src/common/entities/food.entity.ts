import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotel } from './hotel.entity';
import { Ingredient } from './ingredient.entity';
import { ManyToMany, JoinTable } from 'typeorm';

@Entity('foods')
export class Food {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    category: string;

    @Column({ type: 'float', precision: 10, nullable: true })
    calories: number;

    @Column({ type: 'double', precision: 5, scale: 2, nullable: false })
    price: number;

    @Column({ nullable: false })
    status: string;

    @ManyToMany(() => Ingredient, ingredient => ingredient.foods)
    @JoinTable()
    ingredients: Ingredient[];

    @Column({ nullable: true })
    timeToMake: string;

    @ManyToOne(() => Hotel, hotel => hotel.foods)
    hotel: Hotel;
}
