import { IsNumber, IsString } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Entorno } from "src/entorno/entities/entorno.entity";

export class ProductoDto {
    @IsString()
    name: string;

    @IsString()
    descripcion: string;

    @IsString()
    imagen: string;

    @IsNumber()
    price: number;

    categoria: Categoria;

    entorno: Entorno;
}
