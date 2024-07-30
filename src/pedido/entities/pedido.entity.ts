import { PedidoProducto } from "src/pedido-producto/entities/pedido-producto.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })  // Cambiado a 'timestamp'
  fecha: Date;

  @Column({ type: 'text' })  // Cambiado a 'text'
  detalle: string;

  @OneToMany(() => PedidoProducto, pediProduct => pediProduct.pedido)
  pedidosProducto: PedidoProducto[];

  @ManyToOne(() => User, user => user.pedidos)
  @JoinColumn({ name: "usuario_id" })
  user: User;

  constructor(fecha: Date, detalle: string, user: User) {
    this.fecha = fecha;
    this.detalle = detalle;
    this.user = user;
  }
}
