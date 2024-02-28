import { Injectable } from '@angular/core';
import { AuditoriumPayload } from '../../data-structures/payloads/auditorium/AuditoriumPayload';

@Injectable({
    providedIn: 'root'
})
export class SelectSeatService {

    selectedSeats: { rowNumber: number, seatNumber: number }[] = [];


    constructor() {}


    setSelectedSeats(rowNumber: number, seatNumber: number) { 
        this.selectedSeats.push({ rowNumber, seatNumber });
    }

    getSelectedSeats() {
        return this.selectedSeats;
    }

    calculateSeatNumber(rowIndex: number, auditoriumPayload: AuditoriumPayload, seatIndex: number): number {
        return rowIndex * auditoriumPayload.seats + seatIndex + 1;
    }

    removeSelectedSeat(rowIndex: number, seatNumber: number) {
        this.selectedSeats = this.selectedSeats.filter(seat => seat.rowNumber !== rowIndex || seat.seatNumber !== seatNumber);
    }

    isSeatSelected(rowIndex: number, auditoriumPayload: AuditoriumPayload, seatIndex: number): boolean {
        const seatNumber = this.calculateSeatNumber(rowIndex, auditoriumPayload, seatIndex);
        return this.selectedSeats.some(seat => seat.rowNumber === rowIndex && seat.seatNumber === seatNumber);
    }
}
