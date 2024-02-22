import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuditoriumPayload } from '../../data-structures/payloads/auditorium/AuditoriumPayload';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  rowsArray: number[] = [];
  seatsArray: number[] = [];

  seatsNumber: number = 2; // przyjdzie z wybrania miejsc
  selectedSeats: number[] = [];


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<AuditoriumPayload>(this.auditoriumUrl).subscribe(
      (data: AuditoriumPayload) => {                
        this.auditoriumPayload = data;
        console.log(this.auditoriumPayload);
        this.createArrays(this.auditoriumPayload);
        console.log("this.rowsArray.length " + this.rowsArray.length);
      }
    );
  }

  createArrays(auditoriumPayload: AuditoriumPayload) {
    for (let i = 0; i < auditoriumPayload.rows; i++) {
        this.rowsArray.push(i);
    }

    for (let j = 0; j < auditoriumPayload.seats; j++) {
        this.seatsArray.push(j);
    }
  }

  selectSeat(rowIndex: number, seatIndex: number) {
    const seatNumber = rowIndex * this.auditoriumPayload.seats + seatIndex + 1;

    if (this.selectedSeats.includes(seatNumber)) {
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatNumber);
    } else {
      if (this.selectedSeats.length < this.seatsNumber) {
        this.selectedSeats.push(seatNumber);
      }
    }
  }

  isSeatSelected(rowIndex: number, seatIndex: number): boolean {
    const seatNumber = rowIndex * this.auditoriumPayload.seats + seatIndex + 1;
    return this.selectedSeats.includes(seatNumber);
  }

}
