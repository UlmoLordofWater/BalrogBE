import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'prisma';
import * as bcrypt from 'bcrypt';

/**
 * cursor parking
 |--------------| npx prisma push
 |              | npm run start:dev
 |--------------|
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerUser(email: string, password: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,        
        passwordHash: bcrypt.hash( password,10),
      },
    }).catch(e=>{
      throw new HttpException('jake says '+e, HttpStatus.I_AM_A_TEAPOT);
    });
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
