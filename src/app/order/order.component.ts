import { Component, OnInit } from '@angular/core';
import { MoviesRepertoireDaysPayload } from '../data-structures/payloads/movies/repertorie/MoviesRepertoireDaysPayload';
import { MoviesRepertoireHoursPayload } from '../data-structures/payloads/movies/repertorie/MoviesRepertoireHoursPayload';
import { MoviesRepertoirePayload } from '../data-structures/payloads/movies/repertorie/MoviesRepertoirePayload';
import { RepertoireService } from '../movies/repertoire/repertoire.service';
import { SelectSeatService } from '../ticket/select-seat/select-seat.service';
import { SelectTicketService } from '../ticket/select-ticket/select-ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketsTypePayload } from '../data-structures/payloads/tickets/TicketsTypePayload';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  selectedMovie: MoviesRepertoirePayload | null = null;
  selectedHour: MoviesRepertoireHoursPayload | null = null;
  selectedDay: MoviesRepertoireDaysPayload | null = null;
  selectedSeats: { rowNumber: number, seatNumber: number }[] = [];
  selectedTickets: { ticket: TicketsTypePayload, amount: number }[] = [];
  ticketAmount!: number;
  totalTicketsPrice!: number;

  constructor(private repertoireService: RepertoireService, private selectSeatService: SelectSeatService, private selectTicketService: SelectTicketService) { }


  ngOnInit(): void {
    this.selectedMovie = this.repertoireService.getSelectedMovie();
    this.selectedHour = this.repertoireService.getSelectedHour();
    this.selectedDay = this.repertoireService.getSelectedDay();
    this.selectedSeats = this.selectSeatService.getSelectedSeats();
    this.selectedTickets = this.selectTicketService.getSelectedTickets();
    this.ticketAmount = this.selectTicketService.getSelectedTicketstAmount();
    this.totalTicketsPrice = this.calculateTotalTicetsPrice();

    console.log("OrderingTicketComponent selectedMovie: ", this.selectedMovie?.title);
    console.log("OrderingTicketComponent selectedHour: ", this.selectedHour?.hour);
    console.log("OrderingTicketComponent selectedDay: ", this.selectedDay);
    console.log("OrderingTicketComponent selectedSeats: ", this.selectedSeats);
    console.log("OrderingTicketComponent selectedTicketsAmount: ", this.selectedTickets);
    console.log("OrderingTicketComponent ticketAmount: ", this.ticketAmount);
    console.log("OrderingTicketComponent totalTicketsPrice: ", this.totalTicketsPrice);
  }


  calculateTotalTicetsPrice(): number {
    let priceSum = 0;
    for (const selectedTicket of this.selectedTickets) {
      const price = parseFloat(selectedTicket.ticket.price);
      const amount = selectedTicket.amount;
      priceSum += price * amount;
    }

    return priceSum;
  }

  

}
