import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}
  async create(datos: UserDto):Promise<User> {
    const existeUsuario = await this.userRepository.findOne({where:{email: datos.email}});
     if(existeUsuario){
       throw new HttpException(`El email ${datos.email} ya existe en la base de datos`,HttpStatus.CONFLICT);  
      } 
      try{
        let usuario: User;
        if(datos.email && datos.name && datos.lastname && datos.telephone ){
          usuario= new User(datos.name, datos.lastname, datos.telephone, datos.email)
         usuario = await this.userRepository.save(usuario);
          return usuario;
        } else {
          throw new NotFoundException(`Algunos de los campos no está completo o
           falta algún caracter. Compruebe los datos ingresados e intente nuevamente`);
        }
        
      }catch(error){
  throw new HttpException(`No se pudo crear el usuario ${datos.name} ${datos.lastname}, 
  intente nuevamente en unos segundos`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  /* async findAll():Promise<User[]> {
    try{

     }catch(error){
  throw new HttpException(`No se encontró al usuario esepcificado, HttpStatus.INTERNAL_SERVER_ERROR`,
  HttpStatus.INTERNAL_SERVER_ERROR
  );
      }

    
  } */

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
