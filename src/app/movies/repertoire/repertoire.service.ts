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

  selectedMovie: MoviesRepertoirePayload | null = null;
  selectedHour: MoviesRepertoireHoursPayload | null = null;
  selectedDay: MoviesRepertoireDaysPayload | null = null;

  constructor() {
  }

  setSelectedMovie(movie: MoviesRepertoirePayload) {
    this.selectedMovie = movie;
  }

  getSelectedMovie() {
    return this.selectedMovie;
  }

  setSelectedHour(hour: MoviesRepertoireHoursPayload) {
    this.selectedHour = hour;
  }

  getSelectedHour() {
    return this.selectedHour;
  }

  setSelectedDay(day: MoviesRepertoireDaysPayload) {
    this.selectedDay = day;
  }

  getSelectedDay() {
    return this.selectedDay;
  }
}
