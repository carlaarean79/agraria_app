import { PedidoProducto } from "src/pedido-producto/entities/pedido-producto.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'text' })
  detalle: string;

  @OneToMany(() => PedidoProducto, pedidProducto => pedidProducto.pedidos)
  pedidProducto: PedidoProducto[];

  @ManyToOne(() => User, user => user.pedidos)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(fecha: Date, detalle: string, user: User) {
    this.fecha = fecha;
    this.detalle = detalle;
    this.user = user;
  }
}
