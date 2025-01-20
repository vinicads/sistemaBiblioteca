import { Author } from 'src/authors/author.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date', nullable: true })
  publicationDate: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
