import { Body, Controller, Get, HttpCode, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './RolesGuards/auth.guard';
import { Role } from './role.enum';
import { Roles } from './DecoradoreRole/roles.decorador';
import { LoginDto } from './DTO/login.dto';
import { AdminGuard } from './RolesGuards/AdminGuard';
import { RolesGuard } from './RolesGuards/RolesGuard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService
    ){}

    @HttpCode(200)
    @Post('login')
    async singnIn(@Body() LoginDto: LoginDto){
        return this.authService.signIn(LoginDto.email, LoginDto.password, LoginDto.role)
    }

    @Get('profile')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.User)
    getProfile(@Request() req){
        return req.user;
    }
}
