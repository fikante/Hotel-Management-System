import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Room } from './room.entity';
import { Manager } from './manager.entity';
import { Assignment } from './assignments.entity';

@Entity('hotels')
export class Hotel {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    city: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    country: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    pricePerNight: number;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[];
    
    @OneToOne(() => Manager, (manager) => manager.hotel, { onDelete: "SET NULL" })
    manager: Manager;

    @Column()
    location: string;

    @OneToMany(() => Assignment, (assignment) => assignment.hotel)
    assignments: Assignment[];
}