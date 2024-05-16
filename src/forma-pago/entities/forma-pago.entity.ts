import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MetodoDePago } from "../metodoDePago/metodoDePago.enum";
import { Pedido } from "src/pedido/entities/pedido.entity";

@Entity('formaDePago')
export class FormaPago {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'enum',
        enum: MetodoDePago,
        default: MetodoDePago.TransferenciaBancaria,
    })
    metodoPago:MetodoDePago;

    @OneToMany(()=> Pedido, pedido => pedido.metodoPago)
    pedido: Pedido[]
}
