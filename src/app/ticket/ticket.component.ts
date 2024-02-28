import { Component, OnInit } from '@angular/core';
import { SelectTicketComponent } from './select-ticket/select-ticket.component';
import { ActivatedRoute } from '@angular/router';
import { SelectSeatComponent } from "./select-seat/select-seat.component";

@Component({
    selector: 'app-ticket',
    standalone: true,
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.css',
    imports: [
        SelectTicketComponent,
        SelectSeatComponent
    ]
})
export class TicketComponent implements OnInit {
  
    movieId: string | null = null;

    
    constructor(private route: ActivatedRoute) { }


    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.movieId = params.get('id');
        });
    }

}