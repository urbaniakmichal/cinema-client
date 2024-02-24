import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoviesRepertoireHoursPayload } from '../../data-structures/payloads/movies/repertorie/MoviesRepertoireHoursPayload';
import { MoviesRepertoirePayload } from '../../data-structures/payloads/movies/repertorie/MoviesRepertoirePayload';
import { FormsModule } from '@angular/forms';
import { RepertoireService } from '../../movies/repertoire/repertoire.service';
import { MoviesRepertoireDaysPayload } from '../../data-structures/payloads/movies/repertorie/MoviesRepertoireDaysPayload';
import { SelectSeatService } from '../select-seat/select-seat.service';
import { SelectTicketService } from '../select-ticket/select-ticket.service';

@Component({
  selector: 'app-ordering-ticket',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './ordering-ticket.component.html',
  styleUrl: './ordering-ticket.component.css'
})
export class OrderingTicketComponent implements OnInit {

    selectedMovie: MoviesRepertoirePayload | null = null;
    selectedHour: MoviesRepertoireHoursPayload | null = null;
    selectedDay: MoviesRepertoireDaysPayload | null = null;

  
    constructor(private repertoireService: RepertoireService, private selectSeatService: SelectSeatService, private selectTickerService: SelectTicketService) { }
  
    ngOnInit(): void {
      this.selectedMovie = this.repertoireService.getSelectedMovie();
      this.selectedHour = this.repertoireService.getSelectedHour();
      this.selectedDay = this.repertoireService.getSelectedDay();
      console.log("OrderingTicketComponent selectedMovie: ", this.selectedMovie?.title);
      console.log("OrderingTicketComponent selectedHour: ", this.selectedHour?.hour);
      console.log("OrderingTicketComponent selectedDay: ", this.selectedDay);
      
    }


  }