// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Food } from './food.entity';

// @Entity('ingredients')
// export class Ingredient {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @Column({ type: 'varchar', length: 100, nullable: false })
//     name: string;

//     @Column({ type: 'float', precision: 10, nullable: true })
//     quantity: number;

//     @ManyToOne(() => Food, (food) => food.ingredients, { nullable: false })
//     food: Food;
// }