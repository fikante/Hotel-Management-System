import { IsUrl } from 'class-validator';
import{Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Room } from '../rooms/entities/room.entity';

@Entity()
export class Hotel{
    @PrimaryGeneratedColumn()
    hotelId: string;

    @Column()
    name: string;

    @Column()
    location: string;
    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[];

    @Column()
    image : string;

}