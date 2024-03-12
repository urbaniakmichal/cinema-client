import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  RootMoviesRepertoirePayload
} from "../../../data-structures/payloads/movies/repertorie/RootMoviesRepertoirePayload";
import {
  MoviesRepertoireDaysPayload
} from "../../../data-structures/payloads/movies/repertorie/MoviesRepertoireDaysPayload";

@Component({
  selector: "app-repertoire-days",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: "./repertoire-days.component.html",
  styleUrl: "./repertoire-days.component.scss"
})
export class RepertoireDaysComponent implements AfterViewInit {

  @Input() rootMoviesRepertoirePayload!: RootMoviesRepertoirePayload[];

  @Output() buttonClicked = new EventEmitter<number>();
  @Output() daySelected: EventEmitter<MoviesRepertoireDaysPayload> = new EventEmitter<MoviesRepertoireDaysPayload>();

  isPressed: boolean[] = [];
  currentPressedIndex!: number;

  constructor() {
  }


  ngAfterViewInit(): void {
    this.setFirstDayAsMarkedByDefault();
  }

  protected setFirstDayAsMarkedByDefault(): void {
    if (this.rootMoviesRepertoirePayload && this.rootMoviesRepertoirePayload.length > 0) {
      this.isPressed[0] = true;
      this.daySelected.emit(this.rootMoviesRepertoirePayload[0].repertoireDay);
    } else {
      console.error("rootMoviesRepertoirePayload is empty")
    }
  }

  protected selectDayToShowRepertoire(index: number): void {
    if (this.currentPressedIndex !== null) {
      this.isPressed[this.currentPressedIndex] = false;
    }
    this.isPressed[0] = false;
    this.isPressed[index] = true;
    this.currentPressedIndex = index;
  }

  protected emitEventWhatIndexOfDayClicked(index: number): void {
    this.buttonClicked.emit(index);
  }

  protected emitEventWhatPayloadOfDayClicked(day: MoviesRepertoireDaysPayload): void {
    this.daySelected.emit(day);
  }


}
