import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking.entity";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column({nullable: true})
    picture: string;

    @Column()
    email: string;

    @Column({nullable: true})
    phone: string;
    
    @Column()
    password: string;

    @Column({nullable: true})
    address: string;

    @Column()
    identificationType: string;

    @Column({nullable: true})
    identificationNumber: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    gender: string;

    @Column({nullable: true})
    dateOfBirth: Date;

    @Column()
    nationality: string;
    
    // usefule for payloading the jwt
    @Column({nullable: true})
    role: String;

    @OneToMany(() => Booking, (booking) => booking.guest)
    bookings: Booking[];
}