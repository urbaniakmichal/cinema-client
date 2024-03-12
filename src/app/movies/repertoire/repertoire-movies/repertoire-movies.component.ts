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
import { ToastService } from "../../../features/toast.service";

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


  constructor(
    private router: Router,
    private toastService: ToastService
  ) {
  }


  ngOnInit(): void {
    this.setFirstDateAsSelected();
  }


  protected getMoviesList(): any[] {
    return this.rootMoviesRepertoirePayload ?
      this.rootMoviesRepertoirePayload[(this.selectedIndex !== null ? this.selectedIndex : 0)].movies : [];
  }

  protected setFirstDateAsSelected(): void {
    if (this.selectedIndex === null) {
      this.selectedIndex = 0;
    }
  }

  protected navigateToMovieDetails(id: string): void {
    this.router
      .navigate(["/movie-details", id])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

  protected navigateToBuyTicket(id: string): void {
    this.router
      .navigate(["/buy-ticket", id])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

  protected navigateToTicket(): void {
    this.router
      .navigate(["/select-ticket"])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

  protected emitEventWhatPayloadOfMovieClicked(movie: MoviesRepertoirePayload): void {
    this.movieSelected.emit(movie);
  }

  protected emitEventWhatPayloadOfHourClicked(hour: MoviesRepertoireHoursPayload): void {
    this.hourSelected.emit(hour);
  }

}
