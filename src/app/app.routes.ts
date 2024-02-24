import { Routes } from '@angular/router';
import { LoginComponent } from './header/login/login.component';
import { RegisterComponent } from './header/register/register.component';
import { RepertoireComponent } from './movies/repertoire/repertoire.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { TicketComponent } from './ticket/ticket.component';
import { SelectSeatComponent } from './ticket/select-seat/select-seat.component';
import { OrderingTicketComponent } from './ticket/ordering-ticket/ordering-ticket.component';
import { SelectTicketComponent } from './ticket/select-ticket/select-ticket.component';
import { OrderComponent } from './order/order.component';

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
    },
    {
        path:'select-seat',
        component: SelectSeatComponent
    },
    {
        path:'ordering-ticket',
        component: OrderingTicketComponent
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
