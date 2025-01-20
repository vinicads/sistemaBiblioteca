import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-book-popup',
  templateUrl: './delete-book-popup.html',
  styleUrls: ['./delete-book-popup.component.css'],
  imports: [FormsModule]
})
export class DeleteBookPopupComponent {
  @Input() bookId: string = '';
  @Input() bookName: string = '';
  
  @Output() bookDeleted = new EventEmitter<string>();
  @Output() close = new EventEmitter();
  
  deleteBook() {
      this.bookDeleted.emit(this.bookId);
  }

  closePopup() {
      this.close.emit();
  }
}
