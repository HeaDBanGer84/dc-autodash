import { Console } from "console";
import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";

@Entity()
export class DockerContainer{

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    exposedUrl: string;

    @Column()
    icon: string;

    @Column()
    color: string;

}