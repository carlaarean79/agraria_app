import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/auth/role.enum';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  telphone?: string; // Hacerlo opcional

  @IsOptional()
  @IsEmail()
  email?: string; // Hacerlo opcional

  @IsOptional()
  @IsString()
  password?: string; // Hacerlo opcional

  @IsOptional()
  @IsString()
  role?: Role; // Hacerlo opcional
}
