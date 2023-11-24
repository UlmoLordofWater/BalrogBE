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
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoginDto } from './auth/dto/login.dto';
import { User } from 'prisma';
import * as fs from "fs";
import * as jwt from 'jsonwebtoken';

// const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');
@Controller()
export class AppController {
  constructor(
    private authService: AuthService, 
    private userService: UsersService, 
    ){}

  // @UseGuards(LocalAuthGuard)  
  // @Post('auth/login')
  // public async login(@Body() loginDto: LoginDto) { //use dto
  //   console.log("Logged in user:", loginDto)
  //   return await this.authService.login(loginDto);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public async login(@Body() loginDto: LoginDto) {
    const email = loginDto.email,
          password = loginDto.password;
    console.log("made it the login controller")
    if(this.authService.validateUser(email, password)){
      const userId = loginDto.body.userId(email);
      const jwtBearerToken = jwt.sign({}, "uylfuyfkjhgjh", {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: userId
    })

    return this.authService.login(userId);
    } else {
      alert("401");
    }
  }

  @Post('register')
  signupUser(
    @Body() data: LoginDto,
  ): Promise<User> {
    console.log("Registering user:",data) //npm run start:dev
    return this.userService.registerUser(data.email, data.password);
  }
}