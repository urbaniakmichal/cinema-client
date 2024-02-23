import { Injectable } from '@angular/core';
import { MoviesRepertoireHoursPayload } from '../../data-structures/payloads/movies/repertorie/MoviesRepertoireHoursPayload';
import { MoviesRepertoirePayload } from '../../data-structures/payloads/movies/repertorie/MoviesRepertoirePayload';

@Injectable({
  providedIn: 'root'
})
export class RepertoireService {

    selectedMovie: MoviesRepertoirePayload | null = null;
    selectedHour: MoviesRepertoireHoursPayload | null = null;
  
    constructor() { }
  
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
}
