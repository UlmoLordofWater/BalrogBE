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

  
  async checkUsersPassword(
    email: string,
    password: string,
  ): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.usersService.findOne(email);
    let isMatch = await bcrypt.compare(password, user.passwordHash)
    console.log(user.passwordHash, isMatch)
    if (isMatch === true) {
      //jake we hash incoming password and check them
      const { passwordHash, ...userWithOutHash } = user;
      // return user;
      return userWithOutHash;
      // return {...user};
    }else {
      console.info("user was not found in the database")
      return null;
    }
  }

  //login user gives the jwt which can use to authenticate routes
  async signUserJwt(user: Omit<User, 'passwordHash'>): Promise<{ access_token: string}> {
    
    // const payload = { email: user.email, sub: user.id };
    console.log(this.jwtService.sign(user))
    return {
      access_token: this.jwtService.sign(user),
    };
    
  }
}
