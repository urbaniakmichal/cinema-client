import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoviesRepertoirePayload } from '../../../data-structures/MoviesRepertoirePayloadInterface';

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

    @Input() moviesRepertoirePayload!: MoviesRepertoirePayload[];
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