import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ordering-ticket',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './ordering-ticket.component.html',
  styleUrl: './ordering-ticket.component.css'
})
export class OrderingTicketComponent {

}
