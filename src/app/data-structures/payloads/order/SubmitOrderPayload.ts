import { TicketsTypePayload } from "../tickets/TicketsTypePayload";

export interface SubmitOrderPayload {

  orderId: string;
  userId: string;
  selectedMovieId: string;
  selectedMovieHourId: string,
  selectedDay: string;
  selectedSeats: { rowNumber: number, seatNumber: number }[];
  selectedTickets: { ticket: TicketsTypePayload, amount: number }[];
  ticketAmount: number;
  totalTicketsPrice: number;
}
