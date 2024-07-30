import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() UserDto: UserDto):Promise<User> {
    return this.usersService.create(UserDto);
  }

  @Get()
  @HttpCode(200)
  async findAll():Promise<User[]> {
    return  await this.usersService.findAll();
  } 

  @Get(':id')
  @HttpCode(200)
 async findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}
   )) id: number):Promise<User>{
    return  await this.usersService.findOne(id);
  } 

  @Put(':id')
  async update(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}
      )) id: number, @Body() UserDto: UserDto) {
    return  await this.usersService.update(id, UserDto);
  }

  @Delete(':id')
  @HttpCode(200)
 async  remove(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}
  )) id: number) {
    return await this.usersService.remove(id);
  }
}
