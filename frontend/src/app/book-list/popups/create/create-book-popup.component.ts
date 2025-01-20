import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-create-book-popup',
  templateUrl: './create-book-popup.html',
  styleUrls: ['./create-book-popup.component.css'],
  imports: [FormsModule,ReactiveFormsModule]
})
export class CreateBookPopupComponent {
  authors = new BehaviorSubject<any[]>([]); 
  bookName: string = '';
  bookPublicationDate: Date = new Date();
  bookAuthor: string = '';
  apiUrl = 'http://localhost:3000/authors'; 
  @Output() bookCreated = new EventEmitter<Object>();
  @Output() close = new EventEmitter<string>();

    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.fetchAuthors(); 
    }

  fetchAuthors() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.authors.next(response); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  createBook() {
    if (this.bookName && this.bookAuthor && this.bookPublicationDate) {
      const book = {
        name: this.bookName,
        author: this.bookAuthor,
        publicationDate: this.bookPublicationDate
      }
      this.bookCreated.emit(book);
    }
  }

  closePopup() {
      this.close.emit();
  }
}
