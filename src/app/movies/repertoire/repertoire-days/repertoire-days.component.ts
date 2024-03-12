import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  RootMoviesRepertoirePayload
} from "../../../data-structures/payloads/movies/repertorie/RootMoviesRepertoirePayload";
import {
  MoviesRepertoireDaysPayload
} from "../../../data-structures/payloads/movies/repertorie/MoviesRepertoireDaysPayload";
import { RepertoireService } from "../repertoire.service";
import { Subscription } from "rxjs";

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
export class RepertoireDaysComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  rootMoviesRepertoirePayload!: RootMoviesRepertoirePayload[];

  @Output() indexOfDaySelected = new EventEmitter<number>();
  @Output() daySelected: EventEmitter<MoviesRepertoireDaysPayload> = new EventEmitter<MoviesRepertoireDaysPayload>();

  isPressed: boolean[] = [];
  currentPressedIndex!: number;

  constructor(
    private repertoireService: RepertoireService
  ) {
  }


  ngOnInit(): void {
    this.subscription.add(
      this.repertoireService.rootMoviesRepertoirePayload$.subscribe(data => {
        if (data.length > 0) {
          this.setFirstDayAsMarkedByDefault(data);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  protected setFirstDayAsMarkedByDefault(data: RootMoviesRepertoirePayload[]): void {
    this.rootMoviesRepertoirePayload = data;
    this.isPressed[0] = true;
    this.daySelected.emit(data[0].repertoireDay);

    this.repertoireService.setIndexOfDaySelected(0);
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
    this.indexOfDaySelected.emit(index);
  }

  protected emitEventWhatPayloadOfDayClicked(day: MoviesRepertoireDaysPayload): void {
    this.daySelected.emit(day);
  }


}
