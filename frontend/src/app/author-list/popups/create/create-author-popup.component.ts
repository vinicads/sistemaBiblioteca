import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-author-popup',
  templateUrl: './create-author-popup.html',
  styleUrls: ['./create-author-popup.component.css'],
  imports: [FormsModule]
})
export class CreateAuthorPopupComponent {
  authorName: string = '';
  
  @Output() authorCreated = new EventEmitter<string>();
  @Output() close = new EventEmitter<string>();

  createAuthor() {
    if (this.authorName) {
      this.authorCreated.emit(this.authorName);
    }
  }

  closePopup() {
      this.close.emit();
  }
}
