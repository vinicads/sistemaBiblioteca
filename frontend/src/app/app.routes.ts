import { Routes } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookListComponent } from './book-list/book-list.component';

export const routes: Routes = [
    {
        path: "authors",
        component: AuthorListComponent,
    },
    {
        path: "books",
        component: BookListComponent,
    }
];
