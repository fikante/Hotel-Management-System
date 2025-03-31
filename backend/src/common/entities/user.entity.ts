import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;
    
    @Column()
    picture: string;

    @Column()
    email: string;

    @Column()
    phone: string;
    
    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    identificationType: string;

    @Column()
    identificationNumber: string;
    
    @Column()
    createdAt: Date;

    @Column()
    gender: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    nationality: string;
    
    // usefule for payloading the jwt
    @Column()
    role: String;
}