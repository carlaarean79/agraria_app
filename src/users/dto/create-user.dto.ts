import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "src/auth/role.enum";
export class UserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    telphone:string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsOptional()
    @IsString()
    password:string;

    @IsOptional()
    @IsString()
    role?: Role;


}
