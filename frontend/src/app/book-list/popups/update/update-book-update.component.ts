import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-update-book-popup',
  templateUrl: './update-book-popup.html',
  styleUrls: ['./update-book-popup.component.css'],
  imports: [FormsModule]
})
export class UpdateBookPopupComponent {
  @Input() bookId: string = '';
   authors = new BehaviorSubject<any[]>([]);
  @Input() bookName: string = '';
  @Input() bookAuthor: string = '';
  @Input() bookPublicationDate: Date = new Date();
  apiUrl = 'http://localhost:3000/authors'; 
  @Output() bookEdited = new EventEmitter<Object>();
  @Output() close = new EventEmitter();
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
  updateBook() {
    if (this.bookName && this.bookAuthor && this.bookPublicationDate) {
      const book = {
        name: this.bookName,
        id: this.bookId,
        author: this.bookAuthor,
        publicationDate: this.bookPublicationDate
      }
      this.bookEdited.emit(book);
    }
  }

  closePopup() {
      this.close.emit();
  }
}
