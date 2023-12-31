import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'prisma';
import * as bcrypt from 'bcrypt';

export type UserNoPass =Omit<User, 'passwordHash'>;
export type Toke = { access_token: string };
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async checkUsersPassword(
    email: string,
    password: string,
  ): Promise<UserNoPass> {
    const user = await this.usersService.findOne(email);
    let isMatch = await bcrypt.compare(password, user.passwordHash);
    console.log(user.passwordHash, isMatch);
    if (isMatch === true) {
      //jake we hash incoming password and check them
      const { passwordHash, ...userWithOutHash } = user;
      return userWithOutHash;
    } else {
      console.info('user was not found in the database');
      return null;
    }
  }

  //login user gives the jwt which can use to authenticate routes
  async signUserJwt(
    user: Omit<User, 'passwordHash'>,
  ): Promise<Toke> {
    console.log('token:', this.jwtService.sign(user));
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
