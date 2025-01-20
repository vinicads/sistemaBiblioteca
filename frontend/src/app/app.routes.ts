import { Routes } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { ChatComponent } from './websocket/chat.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "authors",
        component: AuthorListComponent,
    },
    {
        path: "books",
        component: BookListComponent,
    },
    {
        path: "chat",
        component: ChatComponent,
    },
];
