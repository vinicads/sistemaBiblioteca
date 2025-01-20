import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CreateBookPopupComponent } from './popups/create/create-book-popup.component';
import { UpdateBookPopupComponent } from './popups/update/update-book-update.component';
import { DeleteBookPopupComponent } from './popups/delete/delete-book-update.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CreateBookPopupComponent, UpdateBookPopupComponent, DeleteBookPopupComponent]
})
export class BookListComponent implements OnInit {
  books = new BehaviorSubject<any[]>([]); 
  loading = new BehaviorSubject<boolean>(true);  
  apiUrl = 'http://localhost:3000/books'; 

  selectedBook: any = null;
  showCreatePopup = false;
  showEditPopup = false;
  showDeletePopup = false;
  bookName = "";
  bookId = "";
  bookAuthor = "";
  bookPublicationDate= new Date();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks(); 
  }
  

  fetchBooks() {
    this.loading.next(true); 

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.books.next(response); 
        this.loading.next(false);
      },
      error: (err) => {
        console.error('Erro ao carregar livros:', err);
        this.loading.next(false); 
      }
    });
  }

  openCreatePopup() {
    this.showCreatePopup = true;
  }

  openEditPopup(bookId: string, bookName: string, bookPublicationDate: Date, bookAuthor: string) {
    this.bookName = bookName;
    this.bookPublicationDate = bookPublicationDate;
    this.bookId = bookId;
    this.bookAuthor = bookAuthor;
    this.showEditPopup = true; 
  }

  openDeletePopup(bookId: string, bookName: string) {
    this.bookId = bookId;
    this.bookName = bookName;
    this.showDeletePopup = true; 
  }


  createBook(data: any) {
    let title = data.name;
    let publicationDate = data.publicationDate;
    let author = data.author;
    const newBook = { title, publicationDate, author };
    this.http.post(this.apiUrl, newBook).subscribe(() => {
      this.fetchBooks();
      this.showCreatePopup = false;
    });
  }

  editBook(data: any) {
    let id = data.id;
    let title = data.name;
    let publicationDate = data.publicationDate;
    let author = data.author;
    this.http.put(`${this.apiUrl}/${id}`, {title, publicationDate, author}).subscribe(() => {
      this.fetchBooks();
      this.showEditPopup = false;
    });
  }

  deleteBook(id: any) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.fetchBooks();
      this.showDeletePopup = false;
    });
  }
}
