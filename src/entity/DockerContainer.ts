import { Console } from "console";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class DockerContainer{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    exposedUrl: string;

    @Column()
    icon: string;

    @Column()
    color: string;

}