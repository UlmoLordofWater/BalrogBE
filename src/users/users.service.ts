import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
          userId: 1,
          email: 'j@j.com',
          password: 'changeme',
        },
        {
          userId: 2,
          email: 'm@m.com',
          password: 'guess',
        },
      ];

      async registerUser(){}

      async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
      }
}
