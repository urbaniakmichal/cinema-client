import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuditoriumPayload } from '../../data-structures/payloads/auditorium/AuditoriumPayload';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderingTicketService } from '../ordering-ticket/ordering-ticket.service';
import { SelectSeatService } from './select-seat.service';
import { SelectTicketService } from '../select-ticket/select-ticket.service';

@Component({
  selector: 'app-select-seat',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './select-seat.component.html',
  styleUrl: './select-seat.component.css'
})
export class SelectSeatComponent implements OnInit {

  auditoriumUrl = "http://localhost:9092/api/v1/auditorium";
  auditoriumPayload!: AuditoriumPayload;

  createRowsArray: number[] = [];
  createSeatsArray: number[] = [];

  // selectedSeats: number[] = [];
  selectedSeats: { rowNumber: number, seatNumber: number }[] = [];


  constructor(private http: HttpClient, private router: Router, private selectTicketService: SelectTicketService, private selectSeatService: SelectSeatService) {}


  ngOnInit(): void {
    this.http.get<AuditoriumPayload>(this.auditoriumUrl).subscribe(
      (data: AuditoriumPayload) => {                
        this.auditoriumPayload = data;
        this.createSeats(this.auditoriumPayload);
      }
    );

  }



  createSeats(auditoriumPayload: AuditoriumPayload): void {
    for (let i = 0; i < auditoriumPayload.rows; i++) {
        this.createRowsArray.push(i);
    }

    for (let j = 0; j < auditoriumPayload.seats; j++) {
        this.createSeatsArray.push(j);
    }
  }

  selectSeat(rowIndex: number, seatIndex: number): void {
    const seatNumber = this.selectSeatService.calculateSeatNumber(rowIndex, this.auditoriumPayload, seatIndex);

    if (this.isSeatSelected(rowIndex, seatIndex)) {
      this.selectSeatService.removeSelectedSeat(rowIndex, seatIndex);
    } else {
      if (this.selectedSeats.length < this.selectTicketService.getSelectedTicketstAmount()) {
        this.selectedSeats.push({ rowNumber: rowIndex, seatNumber: seatNumber });
        this.selectSeatService.setSelectedSeats(rowIndex, seatNumber);
      }
    }
    console.log("Rzedy i siedzenia: ");
    console.log(this.selectSeatService.getSelectedSeats());
  }

  isSeatSelected(rowIndex: number, seatIndex: number): boolean {
    const seatNumber = this.selectSeatService.calculateSeatNumber(rowIndex, this.auditoriumPayload, seatIndex);
    return this.selectedSeats.some(seat => seat.rowNumber === rowIndex && seat.seatNumber === seatNumber);
  }

  navigateToSelectTicket() : void{
    this.router.navigate(['/buy-ticket']);
  }

  navigateToOrdert(): void {
    this.router.navigate(['/order']);
  }

}
