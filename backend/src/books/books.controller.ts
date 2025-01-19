import { Controller, Get, Post, Body, Param, Put, Delete, Res } from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './boos.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(
    @Body() bookData: Partial<Book>,
    @Res() res: Response,
) {
    return this.booksService.create(bookData, res);
  }

  @Get()
  async findAll(
    @Res() res: Response,
) {
    return this.booksService.findAll(res);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
) {
    return this.booksService.findOne(id, res);
  }

  @Get('author/:authorId')
  async findBooksByAuthor(
    @Param('authorId') authorId: number,
    @Res() res: Response,
) {
    return this.booksService.findBooksByAuthor(authorId, res);
  }

  @Put(':id')
  async update(
    @Param('id') id: number, 
    @Body() bookData: Partial<Book>,
    @Res() res: Response,
) {
    return this.booksService.update(id, bookData, res);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Res() res: Response,
) {
    return this.booksService.remove(id, res);
  }
}
