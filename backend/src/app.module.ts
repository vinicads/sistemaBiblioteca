import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/author.entity';
import { Book } from './books/book.entity';
import { PlaywrightModule } from './playwright/playwright.module';
import { AppGateway } from './chat/websocket';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', 
      database: 'library.db', 
      entities: [Author, Book], 
      synchronize: true,
    }),
    BooksModule,
    AuthorsModule,
    PlaywrightModule,
    AppGateway
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
