import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("persons")
export class Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    last_name: string;

    @Column()
    first_name: string;

    @Column()
    age: number;

    @Column()
    location: string;

    @Column()
    description: string;

}
