import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootMoviesRepertoirePayload } from '../../../data-structures/payloads/movies/repertorie/RootMoviesRepertoirePayload';
import { MoviesRepertoireDaysPayload } from '../../../data-structures/payloads/movies/repertorie/MoviesRepertoireDaysPayload';

@Component({
  selector: 'app-repertoire-days',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './repertoire-days.component.html',
  styleUrl: './repertoire-days.component.css'
})
export class RepertoireDaysComponent implements  AfterViewInit  {

    @Input() rootMoviesRepertoirePayload!: RootMoviesRepertoirePayload[];

    @Output() buttonClicked = new EventEmitter<number>();
    @Output() daySelected: EventEmitter<MoviesRepertoireDaysPayload> = new EventEmitter<MoviesRepertoireDaysPayload>();

    isPressed: boolean[] = [];
    currentPressedIndex!: number;


    constructor() { }


    ngAfterViewInit(): void {
      this.setFirstDayAsMarkedbyDefault();
    }


    setFirstDayAsMarkedbyDefault() : void {
      this.isPressed[0] = true;
      this.daySelected.emit(this.rootMoviesRepertoirePayload[0].repertoireDay);
    }

    
    togglePressed(index: number) {
      if (this.currentPressedIndex !== null) {
          this.isPressed[this.currentPressedIndex] = false;
      }
      this.isPressed[0] = false;
      this.isPressed[index] = true; 
      this.currentPressedIndex = index; 
    }

    onClick(index: number) {
      this.buttonClicked.emit(index);
    }

    onDaySelected(day: MoviesRepertoireDaysPayload) {
      this.daySelected.emit(day);
    }


}  