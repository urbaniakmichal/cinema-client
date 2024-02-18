import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderMenuItemInterface } from '../data-structures/HeaderMenuItemInterface';
import { LoginComponent } from './login/login.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {




    headerMenuItemInterface: HeaderMenuItemInterface[] = [
            {
                name: "Repertuar"
            },
            {
                name: "Cennik"
            },
            {
                name: "Wydarzenia"
            },
            {
                name: "Promocje"
            }
          ];


}
