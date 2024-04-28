import { Injectable } from '@nestjs/common';
import { CreateEntornoDto } from './dto/create-entorno.dto';
import { UpdateEntornoDto } from './dto/update-entorno.dto';

@Injectable()
export class EntornoService {
  create(createEntornoDto: CreateEntornoDto) {
    return 'This action adds a new entorno';
  }

  findAll() {
    return `This action returns all entorno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entorno`;
  }

  update(id: number, updateEntornoDto: UpdateEntornoDto) {
    return `This action updates a #${id} entorno`;
  }

  remove(id: number) {
    return `This action removes a #${id} entorno`;
  }
}
