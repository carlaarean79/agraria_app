import { Type } from "class-transformer";
import { IsNotEmpty, isNumber, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Entorno } from "src/entorno/entities/entorno.entity";

export class ProductoDto {
    @IsString()
    name: string;

    @IsString()
    detalle:string;
    
    @IsString()
    @IsOptional()
    descripcion?: string;
    
    @IsString()
    imagen: string;
    
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    stock?:number;
    
    @IsNumber()
    @IsOptional()
    categoria?: Categoria;

    @IsNumber()
    @IsOptional()
    entorno?: Entorno;
}
