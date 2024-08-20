import { Role } from "src/auth/role.enum";
import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({ nullable: true })
    telphone: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    messaje: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role;

    @OneToMany(() => Pedido, pedido => pedido.user)
    pedidos: Pedido[];

    constructor(name: string, lastname: string, telphone: string, email: string, password: string) {
        this.name = name;
        this.lastname = lastname;
        this.telphone = telphone;
        this.email = email;
        this.password = password;
    }
}
