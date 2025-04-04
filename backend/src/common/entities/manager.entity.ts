import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Hotel } from "./hotel.entity";

@Entity()
export class Manager {

    @Column()
    managerType: string;

    @OneToOne(() => Hotel, (hotel) => hotel.manager, { cascade: true })
    @JoinColumn() // This decorator specifies that this side owns the relationship
    hotel: Hotel;
}