import { Amenity } from "./amenities.entity";
import {
PrimaryGeneratedColumn,
Column,
ManyToMany,
JoinTable,
Entity,
ManyToOne,
OneToMany,
} from "typeorm";
import { Hotel } from "./hotel.entity";
import { Assignment } from './assignments.entity';

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    
    id: string;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column()
    status: string; // available, booked, under maintenance

    @Column()
    type: string; // single, double, suite

    @ManyToMany(() => Amenity, (amenity) => amenity.rooms, { cascade: true })
    @JoinTable()
    amenities: Amenity[];

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { onDelete: "CASCADE" })
    hotel: Hotel;

    @Column()
    roomNumber: string;

    @Column()
    occupancy: number;

    @Column()
    bed: number;

    @Column()
    image: string;

    @Column()
    size: number;

    @OneToMany(() => Assignment, (assignment) => assignment.room)
    assignments: Assignment[];
}