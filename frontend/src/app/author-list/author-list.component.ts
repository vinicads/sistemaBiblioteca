import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CreateAuthorPopupComponent } from './popups/create/create-author-popup.component';
import { UpdateAuthorPopupComponent } from './popups/update/update-author-update.component';
import { DeleteAuthorPopupComponent } from './popups/delete/delete-author-update.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
  imports: [CreateAuthorPopupComponent, UpdateAuthorPopupComponent, DeleteAuthorPopupComponent]
})
export class AuthorListComponent implements OnInit {
  authors = new BehaviorSubject<any[]>([]); 
  loading = new BehaviorSubject<boolean>(true);  
  apiUrl = 'http://localhost:3000/authors'; 

  selectedAuthor: any = null;
  showCreatePopup = false;
  showEditPopup = false;
  showDeletePopup = false;
  authorName = "";
  authorId = ""
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAuthors(); 
  }
  

  fetchAuthors() {
    this.loading.next(true); 

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.authors.next(response); 
        this.loading.next(false);
      },
      error: (err) => {
        console.error('Erro ao carregar autores:', err);
        this.loading.next(false); 
      }
    });
  }

  openCreatePopup() {
    this.showCreatePopup = true;
  }

  openEditPopup(authorId: string, authorName: string) {
    this.authorName = authorName;
    this.authorId = authorId;
    this.showEditPopup = true; 
  }

  openDeletePopup(authorId: string, authorName: string) {
    this.authorName = authorName;
    this.authorId = authorId;
    this.showDeletePopup = true; 
  }


  createAuthor(name: string) {
    const newAuthor = { name };
    this.http.post(this.apiUrl, newAuthor).subscribe(() => {
      this.fetchAuthors();
      this.showCreatePopup = false;
    });
  }

  editAuthor(data: any) {
    let id = data.id;
    let name = data.name;
    this.http.put(`${this.apiUrl}/${id}`, {name}).subscribe(() => {
      this.fetchAuthors();
      this.showEditPopup = false;
    });
  }

  deleteAuthor(id: any) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.fetchAuthors();
      this.showDeletePopup = false;
    });
  }
}
