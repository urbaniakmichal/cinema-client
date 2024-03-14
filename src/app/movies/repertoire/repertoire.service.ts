import { Injectable } from "@angular/core";
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
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RepertoireService {

  rootMoviesRepertoirePayload: RootMoviesRepertoirePayload[] | null = null;
  isPressed: boolean[] = [];

  indexOfDaySelected: number = 0;

  selectedMovie!: MoviesRepertoirePayload;
  selectedHour: MoviesRepertoireHoursPayload | null = null
  selectedDay!: MoviesRepertoireDaysPayload;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService
  ) {
    this.requestForMoviesRepertoire();
    this.setFirstDateAsSelected();
  }


  getMoviesList(): MoviesRepertoirePayload[] {
    if (this.rootMoviesRepertoirePayload && this.rootMoviesRepertoirePayload.length > 0) {
      return this.rootMoviesRepertoirePayload[this.indexOfDaySelected]?.movies;
    } else {
      return [];
    }
  }

  navigateToMovieDetails(id: string): void {
    this.router
      .navigate(["/movie-details", id])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

  navigateToTicket(): void {
    this.router
      .navigate(["/select-ticket"])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

  setSelectedMovieByHour(movie: MoviesRepertoirePayload, hour: MoviesRepertoireHoursPayload): void {
    if (this.rootMoviesRepertoirePayload) {
      this.selectedMovie = movie;
      this.selectedHour = hour;
      this.selectedDay = this.rootMoviesRepertoirePayload[this.indexOfDaySelected].repertoireDay;
    }
  }

  setSelectedMovieByTitle(movie: MoviesRepertoirePayload): void {
    if (this.rootMoviesRepertoirePayload) {
      this.selectedMovie = movie;
      this.selectedHour = null;
      this.selectedDay = this.rootMoviesRepertoirePayload[this.indexOfDaySelected].repertoireDay;
    }
  }

  setIndexOfRepertoireDaySelected(index: number): void {
    this.indexOfDaySelected = index;
    this.updatePressedFlags();
  }

  getIndexOfRepertoireDaySelected(): number {
    return this.indexOfDaySelected;
  }


  private requestForMoviesRepertoire(): void {
    this.http
      .get<RootMoviesRepertoirePayload[]>(`${environment.apiLocalhostUrl}/repertoire/movies`)
      .subscribe({
        next: responseData => this.rootMoviesRepertoirePayload = responseData,
        error: error => this.toastService.toastError(error)
      });
  }

  private updatePressedFlags(): void {
    this.isPressed.fill(false);
    this.isPressed[this.indexOfDaySelected] = true;
  }

  private setFirstDateAsSelected(): void {
    this.isPressed[0] = true;
  }
}
