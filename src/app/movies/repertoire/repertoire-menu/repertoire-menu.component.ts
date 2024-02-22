import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootMoviesRepertoirePayload } from '../../../data-structures/payloads/movies/repertorie/RootMoviesRepertoirePayload';

@Component({
  selector: 'app-repertoire-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './repertoire-menu.component.html',
  styleUrl: './repertoire-menu.component.css'
})
export class RepertoireMenuComponent implements  AfterViewInit  {

    @Input() rootMoviesRepertoirePayload!: RootMoviesRepertoirePayload[];
    @Output() buttonClicked = new EventEmitter<number>();

    isPressed: boolean[] = [];
    currentPressedIndex: number | null = null;

    constructor() { }


        
    ngAfterViewInit(): void {
        this.isPressed[0] = true;
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
}  