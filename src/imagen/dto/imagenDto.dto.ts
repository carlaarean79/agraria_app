import { IsString } from "class-validator";

export class ImagenDto {
    @IsString()
    name:string;
    
    @IsString()
    url: string;
}