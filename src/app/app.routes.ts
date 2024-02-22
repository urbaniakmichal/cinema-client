import { Routes } from '@angular/router';
import { LoginComponent } from './header/login/login.component';
import { RegisterComponent } from './header/register/register.component';
import { RepertoireComponent } from './movies/repertoire/repertoire.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { TicketComponent } from './ticket/ticket.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'repertoire', 
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'repertoire',
        component: RepertoireComponent
    },
    { 
        path: 'movie-details/:id',
        component: MovieDetailsComponent 
    }, 
    {
        path: 'buy-ticket/:id',
        component: TicketComponent
    }

];
