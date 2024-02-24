import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './header/login/login.component';
import { RegisterComponent } from './header/register/register.component';
import { MyAccountComponent } from './header/my-account/my-account.component';
import { LogoComponent } from './header/logo/logo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'primeng/api/public_api';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, tap, catchError } from 'rxjs';
import { RepertoireComponent } from "./movies/repertoire/repertoire.component";
import { FooterComponent } from './footer/footer.component';
import { RepertoireMoviesComponent } from './movies/repertoire/repertoire-movies/repertoire-movies.component';
import { AnnouncementsComponent } from './movies/announcements/announcements.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { SelectSeatComponent } from './ticket/select-seat/select-seat.component';
import { OrderingTicketComponent } from './ticket/ordering-ticket/ordering-ticket.component';
import { RepertoireDaysComponent } from './movies/repertoire/repertoire-days/repertoire-days.component';
import { SelectTicketComponent } from './ticket/select-ticket/select-ticket.component';
import { OrderComponent } from './order/order.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        DropdownModule,
        FormsModule,
        LoginComponent,
        HeaderComponent,
        RouterOutlet,
        RepertoireComponent,
        FooterComponent,
        RepertoireMoviesComponent,
        RepertoireDaysComponent,
        AnnouncementsComponent,
        MovieDetailsComponent,
        SelectSeatComponent,
        OrderingTicketComponent,
        SelectTicketComponent,
        OrderComponent
    ]
})
export class AppComponent {

} 
