import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MovieDetailsComponent } from "../../movie-details/movie-details.component";
import {
  RootMoviesRepertoirePayload
} from "../../../data-structures/payloads/movies/repertorie/RootMoviesRepertoirePayload";
import { MoviesRepertoirePayload } from "../../../data-structures/payloads/movies/repertorie/MoviesRepertoirePayload";
import {
  MoviesRepertoireHoursPayload
} from "../../../data-structures/payloads/movies/repertorie/MoviesRepertoireHoursPayload";

@Component({
  selector: "app-repertoire-movies",
  standalone: true,
  templateUrl: "./repertoire-movies.component.html",
  styleUrl: "./repertoire-movies.component.scss",
  imports: [
    CommonModule,
    RouterModule,
    MovieDetailsComponent
  ]
})
export class RepertoireMoviesComponent implements OnInit {

  @Input() rootMoviesRepertoirePayload!: RootMoviesRepertoirePayload[];
  @Input() selectedIndex: number | null = null;

  @Output() movieSelected: EventEmitter<MoviesRepertoirePayload> = new EventEmitter<MoviesRepertoirePayload>();
  @Output() hourSelected: EventEmitter<MoviesRepertoireHoursPayload> = new EventEmitter<MoviesRepertoireHoursPayload>();


  constructor(private router: Router) {
  }


  ngOnInit(): void {
    this.setFirstDateAsSelected();
  }


  setFirstDateAsSelected(): void {
    if (this.selectedIndex === null) {
      this.selectedIndex = 0;
    }
  }

  navigateToMovieDetails(id: string) {
    this.router.navigate(["/movie-details", id]);
  }

  navigateToBuyTicket(id: string) {
    this.router.navigate(["/buy-ticket", id]);
  }

  navigateToTicket() {
    this.router.navigate(["/select-ticket"]);
  }

  emitEventWhatPayloadOfMovieClicked(movie: MoviesRepertoirePayload) {
    this.movieSelected.emit(movie);
  }

  emitEventWhatPayloadOfHourClicked(hour: MoviesRepertoireHoursPayload) {
    this.hourSelected.emit(hour);
  }

}
