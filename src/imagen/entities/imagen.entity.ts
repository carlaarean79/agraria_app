import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  name: string;

  @Column({nullable:true})
  categoria: string;

  @Column()
  url: string;

  constructor(name: string,categoria:string, url: string) {
    this.name = name;
    this.url = url;
    this.categoria = categoria;
  }
}
