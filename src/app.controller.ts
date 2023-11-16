import {
  Controller,
  Request,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { get } from 'http';
import { LoginDto } from './auth/dto/login.dto';
import { User } from 'prisma';

@Controller()
export class AppController {

  constructor(
    private authService: AuthService, 
    private userService: UsersService, 
    ){}

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) { //use dto
    return this.authService.login(loginDto.email);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  signupUser(
    @Body() data: LoginDto,
  ): Promise<User> {
    console.log("hello world",data) //npm run start:dev
    return this.userService.registerUser(data.email, data.password);
  }
}