import { TicketsTypePayload } from "../tickets/TicketsTypePayload";

export interface SubmitOrderPayload {

  userId: string;
  selectedMovieId: string;
  selectedMovieHourId: string,
  selectedDayId: string;
  selectedSeats: { rowNumber: number, seatNumber: number }[];
  selectedTickets: { ticket: TicketsTypePayload, amount: number }[];
  ticketAmount: number;
  totalTicketsPrice: number;
}
