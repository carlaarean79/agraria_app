import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";
import { Role } from "../role.enum";

export class LoginDto {
    @IsEmail()
    email: string;
  
   
    @IsString()
    @MinLength(6)
    password: string;
  
    @IsString()
    role: Role;
  }