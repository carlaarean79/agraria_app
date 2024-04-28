import { PedidoProducto } from "src/pedido-producto/entities/pedido-producto.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedido')
export class Pedido {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    cantidad:number

    @Column()
    descripcion:string

    @Column()
    totalApagar:number

    @OneToMany(()=> PedidoProducto, pediProduct=>pediProduct.pedido)
    pedidosProducto:PedidoProducto[];

    @ManyToMany(()=> User, user=>user.pedidos)
    @JoinColumn({name:"usuario_id"})
    user:User;

   constructor(cantidad:number,descripcion:string,totalApagar:number){
    this.cantidad=cantidad;
    this.descripcion=descripcion;
    this.totalApagar =totalApagar
   }
   
}
