import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from 'prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(
    private prisma: PrismaService
  ){}

   async createTodo(title: string): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        title
      }
    }).catch(e => {
      throw new HttpException(e, HttpStatus.I_AM_A_TEAPOT)
    })
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({
      where: {
        id
      }
    })
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return this.prisma.todo.delete({
      where: {
        id
      }
    })
  }
}
