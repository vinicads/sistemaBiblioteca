
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity'; 

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(author: Author): Promise<Author> {
    return this.authorsRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }
}
