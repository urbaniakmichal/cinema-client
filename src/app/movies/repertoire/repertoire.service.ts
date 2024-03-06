import { Injectable } from "@angular/core";
import {
  MoviesRepertoireHoursPayload
} from "../../data-structures/payloads/movies/repertorie/MoviesRepertoireHoursPayload";
import { MoviesRepertoirePayload } from "../../data-structures/payloads/movies/repertorie/MoviesRepertoirePayload";
import {
  MoviesRepertoireDaysPayload
} from "../../data-structures/payloads/movies/repertorie/MoviesRepertoireDaysPayload";

@Injectable({
  providedIn: "root"
})
export class RepertoireService {

  selectedMovie!: MoviesRepertoirePayload;
  selectedHour!: MoviesRepertoireHoursPayload;
  selectedDay!: MoviesRepertoireDaysPayload;

  constructor() {
  }

  setSelectedMovie(movie: MoviesRepertoirePayload): void {
    this.selectedMovie = movie;
  }

  getSelectedMovie(): MoviesRepertoirePayload {
    return this.selectedMovie;
  }

  setSelectedHour(hour: MoviesRepertoireHoursPayload): void {
    this.selectedHour = hour;
  }

  getSelectedHour(): MoviesRepertoireHoursPayload {
    return this.selectedHour;
  }

  setSelectedDay(day: MoviesRepertoireDaysPayload): void {
    this.selectedDay = day;
  }

  getSelectedDay(): MoviesRepertoireDaysPayload {
    return this.selectedDay;
  }
}
