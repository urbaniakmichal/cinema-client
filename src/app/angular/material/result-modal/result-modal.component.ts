import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-result-modal',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './result-modal.component.html',
  styleUrl: './result-modal.component.css'
})
export class ResultModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
