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
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoginDto } from './auth/dto/login.dto';
import { User } from 'prisma';
import { ApiResponse } from '@nestjs/swagger';
import { resUserDto } from './auth/dto/resUser.dto';



@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post('auth/login')
  @ApiResponse({
    description: "This Is what the server will respond with if the login is valid",
    type: resUserDto
  })
  public async login(
    @Body() { email, password }: LoginDto,
  ): Promise<resUserDto> {
    let userFromDb = await this.authService.checkUsersPassword(email, password);
    if (userFromDb != null) {
      return {
        expiresIn: 3600,
        ...userFromDb,
        ...(await this.authService.signUserJwt(userFromDb)),
      };
    } else {  
      throw new HttpException('you are forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Post('register')
  signupUser(@Body() data: LoginDto): Promise<User> {
    console.log('Registering user:', data); //npm run start:dev
    return this.userService.registerUser(data.email, data.password);
  }

  @Get('profile')
  profile(){}

  @Post('create')
  createPost(){}
}
