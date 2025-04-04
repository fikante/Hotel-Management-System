import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';
import { Food } from './food.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Food, (food) => food.id, { nullable: false })
  food: Food;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'double', nullable: false })
  price: number;

 
}
