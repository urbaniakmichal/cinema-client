import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { RepertoireComponent } from './movies/repertoire/repertoire.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { TicketComponent } from './ticket/ticket.component';
import { SelectSeatComponent } from './ticket/select-seat/select-seat.component';
import { SelectTicketComponent } from './ticket/select-ticket/select-ticket.component';
import { OrderComponent } from './order/order.component';
import { RestorePasswordComponent } from './user/restore-password/restore-password.component';

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
        path: 'restore',
        component: RestorePasswordComponent
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
    },
    {
        path:'select-seat',
        component: SelectSeatComponent
    }, 
    {
        path:'order',
        component: OrderComponent
    },
    {
        path: 'buy-ticket',
        component: SelectTicketComponent
    },
    {
        path: 'select-ticket',
        component: SelectTicketComponent
    }
    

];
