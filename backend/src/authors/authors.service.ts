import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(authorData: Partial<Author>, res) {
    try {
        const author = await this.authorRepository.create(authorData);
        await this.authorRepository.save(author);
        const dataReturn = {
            status: 200,
            message: "O autor foi inserido com sucesso.",
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
        const data = await this.authorRepository.find();
        if (data.length > 0){
            const dataReturn = {
                status: 200,
                message: "Os autores foram recuperados com sucesso.",
                data
            }
            return res.status(200).send(dataReturn)
        }else{
            const dataReturn = {
                status: 403,
                message: "Nenhum autor encontrado"
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
        const data = await this.authorRepository.findOne({
            where: { id },
          });
        if (data){
            const dataReturn = {
                status: 200,
                message: "O autor foi recuperado com sucesso.",
                data
            }
            return res.status(200).send(dataReturn)
        }else{
            const dataReturn = {
                status: 403,
                message: "Nenhum autor encontrado"
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
  

  async update(id: number, authorData: Partial<Author>, res) {
    try {
        await this.authorRepository.update(id, authorData);
        const dataReturn = {
            status: 200,
            message: "O autor foi atualizado com sucesso.",
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
        await this.authorRepository.delete(id);
        const dataReturn = {
            status: 200,
            message: "O autor foi apagado com sucesso.",
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
