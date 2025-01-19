import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-author-popup',
  templateUrl: './update-author-popup.html',
  styleUrls: ['./update-author-popup.component.css'],
  imports: [FormsModule]
})
export class UpdateAuthorPopupComponent {
  @Input() authorId: string = '';
  @Input() authorName: string = '';
  
  @Output() authorEdited = new EventEmitter<Object>();
  @Output() close = new EventEmitter();
  
  updateAuthor() {
    if (this.authorName) {
      const author = {
        name: this.authorName,
        id: this.authorId
      }
      this.authorEdited.emit(author);
    }
  }

  closePopup() {
      this.close.emit();
  }
}
