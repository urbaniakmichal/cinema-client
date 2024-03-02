import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-status-modal",
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: "./status-modal.component.html",
  styleUrl: "./status-modal.component.css"
})
export class StatusModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
