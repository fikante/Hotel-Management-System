import { Column, Entity, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Assignment } from "./assignments.entity";

@Entity()
export class Staff extends User {

    constructor()  {
        super();
    }

    @Column()
    salary: string;
    
    @Column()
    staffType: String;

    @Column()
    staffStatus: String;

    @OneToMany(() => Assignment, (assignment) => assignment.staff)
    assignments: Assignment[];
}