import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(bookData: Partial<Book>, res) {
    try {
        const book = await this.bookRepository.create(bookData);
        await this.bookRepository.save(book); 
        const dataReturn = {
            status: 200,
            message: "O livro foi inserido com sucesso.",
        }
        return res.status(200).send(dataReturn)
    } catch (error) {
        const dataReturn = {
            status: 500,
            message: error
        }
        return res.status(500).send(dataReturn)
    }
  }

  async findAll(res) {
    try {
        const data = await this.bookRepository.find({ relations: ['author'] });
        if (data.length > 0){
            return res.status(200).send(data)
        }else{
            const dataReturn = {
                status: 403,
                message: "Nenhum livro encontrado"
            }
            return res.status(403).send(dataReturn)
        }
    } catch (error) {
        const dataReturn = {
            status: 500,
            message: error
        }
        return res.status(500).send(dataReturn)
    }
  }

  async findOne(id: number, res) {
    try {
        const data = await this.bookRepository.findOne({
            where: { id },
            relations: ['author'],
          });
        if (data){
            return res.status(200).send(data)
        }else{
            const dataReturn = {
                status: 403,
                message: "Nenhum livro encontrado"
            }
            return res.status(403).send(dataReturn)
        }
    } catch (error) {
        const dataReturn = {
            status: 500,
            message: error
        }
        return res.status(500).send(dataReturn)
    }
  }
  

  async findBooksByAuthor(authorId: number, res) {
    try {
        const data = await this.bookRepository.find({ where: { author: { id: authorId } }, relations: ['author'] });
        if (data.length > 0){
            const dataReturn = {
                status: 200,
                message: "Os livros do autor foram recuperados com sucesso.",
                data
            }
            return res.status(200).send(dataReturn)
        }else{
            const dataReturn = {
                status: 403,
                message: "Nenhum livro encontrado do autor"
            }
            return res.status(403).send(dataReturn)
        }
    } catch (error) {
        const dataReturn = {
            status: 500,
            message: error
        }
        return res.status(500).send(dataReturn)
    }
  }

  async update(id: number, bookData: Partial<Book>, res) {
    try {
        const book = await this.bookRepository.update(id, bookData);
        const dataReturn = {
            status: 200,
            message: "O livro foi atualizado com sucesso.",
        }
        return res.status(200).send(dataReturn)
    } catch (error) {
        const dataReturn = {
            status: 500,
            message: error
        }
        return res.status(500).send(dataReturn)
    }
  }

  async remove(id: number, res) {
    try {
        const book = await this.bookRepository.delete(id);
        const dataReturn = {
            status: 200,
            message: "O livro foi apagado com sucesso.",
        }
        return res.status(200).send(dataReturn)
    } catch (error) {
        const dataReturn = {
            status: 500,
            message: error
        }
        return res.status(500).send(dataReturn)
    }
  }
}
