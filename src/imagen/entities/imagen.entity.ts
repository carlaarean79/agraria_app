import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  name: string;

  @Column()
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
