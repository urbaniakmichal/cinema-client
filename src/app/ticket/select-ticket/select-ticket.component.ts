import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TicketsTypePayload } from '../../data-structures/payloads/tickets/TicketsTypePayload';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-ticket',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './select-ticket.component.html',
  styleUrl: './select-ticket.component.css'
})
export class SelectTicketComponent implements OnInit {

  ticketsUrl = "http://localhost:9092/api/v1/tickets";
  ticketsTypePayload!: TicketsTypePayload[];


  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.http.get<TicketsTypePayload[]>(this.ticketsUrl).subscribe(
      (data: TicketsTypePayload[]) => {
        this.ticketsTypePayload = data;
        console.log(this.ticketsTypePayload)
      });
  }


  selectSeat() {
    console.log()
  }

}
