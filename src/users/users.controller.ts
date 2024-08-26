import { Controller, Get, Post, Body,  Param, Delete, HttpCode, ParseIntPipe, HttpStatus, Put, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AdminGuard } from 'src/auth/RolesGuards/AdminGuard';
import { AuthGuard } from 'src/auth/RolesGuards/auth.guard';
import { RequestLoginDto } from './dto/RequestLoginDto.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() UserDto: UserDto):Promise<User> {
    return this.usersService.create(UserDto);
  }

  @Get()
  /* @UseGuards(AdminGuard)  */
  @HttpCode(200)
  async findAll():Promise<User[]> {
    return  await this.usersService.findAll();
  } 

  @Get(':id')
  @UseGuards(AuthGuard) 
  @HttpCode(200)
 async findOne(@Request() req: Request & {user:RequestLoginDto},@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}
   )) id: number):Promise<User>{
    const usuario = req.user;
    if(usuario && usuario.role == 'admin' || usuario && id === usuario.sub){
      return  await this.usersService.findOne(id);

    }
  } 

  @Put(':id')
  async update(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}
      )) id: number, @Body() UserDto: UserDto) {
    return  await this.usersService.update(id, UserDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard) 
  @HttpCode(200)
 async  remove(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}
  )) id: number) {
    return await this.usersService.remove(id);
  }
}
