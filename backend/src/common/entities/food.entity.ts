import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('foods')
export class Food {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 120, nullable: false })
    name: string;

    @Column({ type: 'enum', enum: ['vegetables', 'beverages', 'juice', 'meat'], nullable: false })
    category: 'vegetables' | 'beverages' | 'juice' | 'meat';

    @Column({ type: 'float', precision: 10, nullable: true })
    calories: number;

    @Column({ type: 'double', precision: 5, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'enum', enum: ['Out of stock', 'Available'], default: 'Available' })
    status: 'Out of stock' | 'Available';

    @Column({ type: 'time', nullable: false })
    estimatedTime: string;

    // @OneToMany(() => Ingredient, (ingredient) => ingredient.food, { cascade: true })
    // ingredients: Ingredient[];
}