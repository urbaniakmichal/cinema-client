import { Injectable, OnInit } from "@angular/core";
import {
  MoviesRepertoireHoursPayload
} from "../../data-structures/payloads/movies/repertorie/MoviesRepertoireHoursPayload";
import { MoviesRepertoirePayload } from "../../data-structures/payloads/movies/repertorie/MoviesRepertoirePayload";
import {
  MoviesRepertoireDaysPayload
} from "../../data-structures/payloads/movies/repertorie/MoviesRepertoireDaysPayload";
import {
  RootMoviesRepertoirePayload
} from "../../data-structures/payloads/movies/repertorie/RootMoviesRepertoirePayload";
import { HttpClient } from "@angular/common/http";
import { ToastService } from "../../features/toast.service";
import { environment } from "../../../environments/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RepertoireService  {

  private rootMoviesRepertoirePayload = new BehaviorSubject<RootMoviesRepertoirePayload[]>([]);

  indexOfDaySelected!: number;

  selectedMovie!: MoviesRepertoirePayload;
  selectedHour!: MoviesRepertoireHoursPayload;
  selectedDay!: MoviesRepertoireDaysPayload;

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {
    this.loadMoviesRepertoire();
  }


  get rootMoviesRepertoirePayload$() {
    return this.rootMoviesRepertoirePayload.asObservable();
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

  setIndexOfDaySelected(index: number): void {
    this.indexOfDaySelected = index;
  }

  getIndexOfDaySelected(): number {
    return this.indexOfDaySelected;
  }

  private loadMoviesRepertoire(): void {
    this.http
      .get<RootMoviesRepertoirePayload[]>(`${environment.apiLocalhostUrl}/repertoire/movies`)
      .subscribe({
        next: responseData => this.rootMoviesRepertoirePayload.next(responseData),
        error: error => this.toastService.toastError(error)
      });
  }
}
