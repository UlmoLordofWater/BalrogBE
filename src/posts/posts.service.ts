import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from 'prisma';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService){}

  createPost(title: string, content: string): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title,
        content
      }
    }).catch(e => {
      throw new HttpException(e, HttpStatus.I_AM_A_TEAPOT)
    })
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
