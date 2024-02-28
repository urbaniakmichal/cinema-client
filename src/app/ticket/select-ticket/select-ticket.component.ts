import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TicketsTypePayload } from '../../data-structures/payloads/tickets/TicketsTypePayload';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectTicketService } from './select-ticket.service';

@Component({
    selector: 'app-select-ticket',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    templateUrl: './select-ticket.component.html',
    styleUrl: './select-ticket.component.css'
})
export class SelectTicketComponent implements OnInit {

    ticketsUrl = "http://localhost:9092/api/v1/tickets";
    ticketsTypePayload!: TicketsTypePayload[];


    constructor(private http: HttpClient, private router: Router, private selectTicketService: SelectTicketService) {}


    ngOnInit(): void {
        this.http.get<TicketsTypePayload[]>(this.ticketsUrl).subscribe(
            (data: TicketsTypePayload[]) => {
                this.ticketsTypePayload = data;
            });

        this.selectTicketService.selectedTickets = [];
    }


    navigateToSelectSeat() {
        this.router.navigate(['/select-seat']);
    }

    onSelectTicketsAmount(event: any, ticket: TicketsTypePayload) {
        this.selectTicketService.setSelectedTicketsAmount(event.target.value, ticket);
    }
}
