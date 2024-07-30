import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FindManyOptions, FindOneOptions, FindOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async create(datos: UserDto): Promise<User> {
    const existeUsuario = await this.userRepository.findOne({ where: { email: datos.email } });
    if (existeUsuario) {
      throw new HttpException(`El email ${datos.email} ya existe en la base de datos`, HttpStatus.CONFLICT);
    }
    try {
      const user: User = await this.userRepository.save
        (new User(datos.name, datos.lastname, datos.telphone, datos.email))
      if (user) return user;
      throw new NotFoundException(`No se pudo crear el usuario ${datos.name}`)
    } catch (error) {
      throw new HttpException(`No se pudo crear el usuario ${datos.name} ${datos.lastname}, 
  intente nuevamente en unos segundos`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const criterio: FindManyOptions = { relations: ['pedidos','pedidos.pedidoProductos.producto'] };
      const users: User[] = await this.userRepository.find(criterio);
      if (users) return users;
      throw new NotFoundException('No se encontraron usuarios en la base de datos');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar obtener los productos: ${error}`,
      }, HttpStatus.NOT_FOUND);
    }


  }

  async findOne(id: number): Promise<User> {
    try {
      let criterio: FindOneOptions = { relations: ['pedidos','pedidos.pedidosProductos.producto'], where: { id: id } };
      const users = await this.userRepository.findOne(criterio);
      if (users) return users;
      throw new NotFoundException(`No se encontró el usuario con id ${id}`);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar obtener el usuario con id ${id}: ${error}`,
      }, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, datos: UserDto): Promise<User> {
    try {
      let user: User = await this.findOne(id);
      if (!user) {
        throw new NotFoundException(`No se encontró el usuario con id ${id}`);
      }
      user.name = datos.name;
      user.lastname = datos.lastname;
      user.email = datos.email;
      user.telphone = user.telphone;
      user.pedidos = user.pedidos;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error al intentar actualizar el usuario con id ${id}: ${error}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const user: User = await this.findOne(id);
      if (!user) {
        throw new NotFoundException(`No se encontró el usuario con id ${id}`);
      }
      await this.userRepository.remove(user);
      return `El usuario con id ${id} ha sido eliminado correctamente`;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error al intentar eliminar el usuario con id ${id}: ${error}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
