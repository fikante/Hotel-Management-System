// transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Booking, (booking) => booking.transactions, { eager: true }) // Define the relationship
    bookingId: Booking;

    @Column('int')
    amount: number;

    @Column()
    currency: string;

    @Column()
    status: string;

    @Column()
    paymentIntentId: string;

  // Other details can be added as needed.
}
