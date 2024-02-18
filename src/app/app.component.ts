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
import { HeaderDropdownMenu } from './data-structures/HeaderDropdownMenuInterface';
import { MoviesRepertoirePayload } from './data-structures/MoviesRepertoirePayloadInterface';
import { RepertoireComponent } from "./movies/repertoire/repertoire.component";
import { FooterComponent } from './footer/footer.component';
import { RepertoireMoviesComponent } from './movies/repertoire/repertoire-movies/repertoire-movies.component';
import { RepertoireMenuComponent } from './movies/repertoire/repertoire-menu/repertoire-menu.component';
import { AdvertisementsComponent } from "./advertisements/advertisements.component";

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
        RepertoireMenuComponent,
        AdvertisementsComponent
    ]
})
export class AppComponent {






    

} 
