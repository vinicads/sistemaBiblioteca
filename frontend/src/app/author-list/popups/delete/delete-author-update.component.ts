import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-author-popup',
  templateUrl: './delete-author-popup.html',
  styleUrls: ['./delete-author-popup.component.css'],
  imports: [FormsModule]
})
export class DeleteAuthorPopupComponent {
  @Input() authorId: string = '';
  @Input() authorName: string = '';
  
  @Output() authorDeleted = new EventEmitter<string>();
  @Output() close = new EventEmitter();
  
  deleteAuthor() {
      this.authorDeleted.emit(this.authorId);
  }

  closePopup() {
      this.close.emit();
  }
}
