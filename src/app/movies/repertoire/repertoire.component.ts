import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RepertoireMoviesComponent } from "./repertoire-movies/repertoire-movies.component";
import {
  RootMoviesRepertoirePayload
} from "../../data-structures/payloads/movies/repertorie/RootMoviesRepertoirePayload";
import { RepertoireDaysComponent } from "./repertoire-days/repertoire-days.component";
import { MoviesRepertoirePayload } from "../../data-structures/payloads/movies/repertorie/MoviesRepertoirePayload";
import {
  MoviesRepertoireHoursPayload
} from "../../data-structures/payloads/movies/repertorie/MoviesRepertoireHoursPayload";
import { RepertoireService } from "./repertoire.service";
import {
  MoviesRepertoireDaysPayload
} from "../../data-structures/payloads/movies/repertorie/MoviesRepertoireDaysPayload";
import { environment } from "../../../environments/environment";
import { ToastService } from "../../features/toast.service";

@Component({
  selector: "app-repertoire",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RepertoireDaysComponent,
    RepertoireMoviesComponent
  ],
  templateUrl: "./repertoire.component.html"
})
export class RepertoireComponent implements OnInit {

  rootMoviesRepertoirePayload!: RootMoviesRepertoirePayload[];
  repertoireDay!: MoviesRepertoireDaysPayload;
  selectedButtonIndex: number | null = null;

  constructor(
    private http: HttpClient,
    private repertoireService: RepertoireService,
    private toastService: ToastService
  ) {
  }


  ngOnInit(): void {
    this.http
      .get<RootMoviesRepertoirePayload[]>(`${environment.apiLocalhostUrl}/repertoire/movies`)
      .subscribe({
        next: responseData => this.rootMoviesRepertoirePayload = responseData,
        error: error => this.toastService.toastError(error),
        complete: () => console.info(this.rootMoviesRepertoirePayload)
      });
  }


  protected handleButtonClick(index: number): void {
    this.selectedButtonIndex = index;
  }

  protected onMovieSelected(movie: MoviesRepertoirePayload): void {
    this.repertoireService.setSelectedMovie(movie);
  }

  protected onHourSelected(hour: MoviesRepertoireHoursPayload): void {
    this.repertoireService.setSelectedHour(hour);
  }

  protected onDaySelected(day: MoviesRepertoireDaysPayload): void {
    this.repertoireService.setSelectedDay(day);
  }
}
