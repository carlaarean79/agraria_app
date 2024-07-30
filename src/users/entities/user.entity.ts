import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class User {
@PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @Column()
    lastname:string

    @Column()
    telphone:number

    @Column()
    email:string

    @OneToMany(()=> Pedido, pedido=>pedido.user)
    pedidos:Pedido[];

    constructor(name:string,lastname:string,telphone:number,email:string){
        this.name=name;
        this.lastname=lastname;
        this.telphone=telphone;
        this.email=email;
    }
}
