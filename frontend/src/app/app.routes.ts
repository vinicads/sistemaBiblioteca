import { Routes } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';

export const routes: Routes = [
    {
        path: "authors",
        component: AuthorListComponent,
    }
];
