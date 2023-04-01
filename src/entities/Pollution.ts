import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:'pollution'})
export class Pollution {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    aqius: number;

    @Column()
    mainus: string;

    @Column()
    aqicn: number;

    @Column()
    maincn: string;
    
    @Column()
    date: Date;

   
}