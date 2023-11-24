import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //this validate user is not the jwt way but it is a way
  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.usersService.findOne(email);
    let costFactor = 10;
    if (user && user.passwordHash === bcrypt.hash(pass, costFactor)) {
      //jake we hash incoming password and check them
      const { passwordHash, ...result } = user;
      // return user;
      return {...user};
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string}> {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
