import { Component, OnInit } from '@angular/core';
import { SelectTicketComponent } from './select-ticket/select-ticket.component';
import { ActivatedRoute } from '@angular/router';
import { SelectSeatComponent } from "./select-seat/select-seat.component";
import { OrderingTicketComponent } from "./ordering-ticket/ordering-ticket.component";

@Component({
    selector: 'app-ticket',
    standalone: true,
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.css',
    imports: [
        SelectTicketComponent,
        SelectSeatComponent,
        OrderingTicketComponent
    ]
})
export class TicketComponent implements OnInit {
  
  movieId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      console.log("TicketComponent " + this.movieId); 
    });
  }

}