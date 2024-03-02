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


  constructor(private http: HttpClient, private repertoireService: RepertoireService) {
  }


  ngOnInit(): void {
    this.http
      .get<RootMoviesRepertoirePayload[]>(`${environment.apiLocalhostUrl}/repertoire/movies`)
      .subscribe({
        next: responseData => this.rootMoviesRepertoirePayload = responseData,
        error: err => console.error("Observable emitted an error: " + err),
        complete: () => console.error("Observable completed")
      });
  }


  handleButtonClick(index: number) {
    this.selectedButtonIndex = index;
  }

  onMovieSelected(movie: MoviesRepertoirePayload) {
    this.repertoireService.setSelectedMovie(movie);
  }

  onHourSelected(hour: MoviesRepertoireHoursPayload) {
    this.repertoireService.setSelectedHour(hour);
  }

  onDaySelected(day: MoviesRepertoireDaysPayload) {
    this.repertoireService.setSelectedDay(day);
  }
}
