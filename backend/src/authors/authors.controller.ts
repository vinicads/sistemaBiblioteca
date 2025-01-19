import { Controller, Get, Post, Body, Param, Put, Delete, Res } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(
    @Body() authorData: Partial<Author>,
    @Res() res: Response,
) {
    return this.authorsService.create(authorData, res);
  }

  @Get()
  async findAll(
    @Res() res: Response,
  ) {
    return this.authorsService.findAll(res);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,) {
    return this.authorsService.findOne(id, res);
  }
  

  @Put(':id')
  async update(
    @Param('id') id: number, 
    @Body() authorData: Partial<Author>,
    @Res() res: Response,
) {
    return this.authorsService.update(id, authorData, res);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Res() res: Response,
) {
    return this.authorsService.remove(id, res);
  }
}
